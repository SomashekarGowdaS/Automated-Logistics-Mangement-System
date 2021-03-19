import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import FormFields from '../../components/FormFields';
import { updateVehicles } from '../../actions/vehiclesActions';
import { addOrder } from '../../actions/ordersActions';
import { toast } from 'react-toastify';

const initSchema = {
    customerId: yup.string().required('*Select Customer'),
    vehicleId: yup.string().required('*Select Vehicle')
}

const AddOrder = (props) => {
    const [schema, setSchema] = useState(initSchema)
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(yup.object().shape(schema)),
    });
    const watchAllFields = watch();
    const vehiclesState = useSelector((state) => {
        return state.vehicles;
    });
    const itemsState = useSelector((state) => {
        return state.items;
    });
    const customersState = useSelector((state) => {
        return state.customers;
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [formFields, setFormFields] = useState([]);
    const [itemCount, setItemCount] = useState([1]);
    const [deliveryLocation, setDeliveryLocation] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        let schemaClone = { ...schema };
        itemCount.forEach(count => {
            const name = `item${count}`
            let obj = {
                [name]: yup.string().required(),
            };
            schemaClone = { ...obj, ...schemaClone }
        });
        setSchema(schemaClone);
        // eslint-disable-next-line
    }, [itemCount])

    useEffect(() => {
        const customerOptions = customersState.map(customer => {
            let obj = {};
            obj.label = customer.customerName;
            obj.value = customer.id;
            return obj;
        });
        const vehicleOptions = vehiclesState.map(vehicle => {
            let obj = {};
            obj.label = vehicle.registrationNumber;
            obj.value = vehicle.registrationNumber;
            obj.availability = vehicle.availability;
            return obj
        })
        const formFields = [
            { label: "Customers", name: 'customerId', register, error: errors.customerId ? errors.customerId : {}, type: 'select', options: customerOptions },
            { label: "Vehicles", name: 'vehicleId', register, error: errors.vehicleId ? errors.vehicleId : {}, type: 'select', options: vehicleOptions }
        ];
        setFormFields(formFields)
    }, [vehiclesState, itemsState, customersState, errors.customerId, errors.vehicleId, register]);

    useEffect(() => {
        let totalPrice = 0;
        let itemIds = [];
        for (let key in watchAllFields) {
            if (key.includes('item')) {
                itemIds.push(watchAllFields[key])
            }
        }
        itemIds.forEach(item => {
            const currentItem = itemsState.find(item1 => item1.id === item);
            if (currentItem)
                totalPrice = totalPrice + currentItem.price;
        });
        setTotalPrice(totalPrice);
        const customer = customersState.find(customer => {
            return customer.id === watchAllFields.customerId;
        });
        if (customer) {
            setDeliveryLocation(customer.city);
        }
    }, [watchAllFields, customersState, itemsState]);

    useEffect(() => {
        if (deliveryLocation) {
            const availableVehiclesForCurrentLocation = vehiclesState.filter(vehicle => {
                return vehicle.city.toLowerCase() === deliveryLocation.toLowerCase() && vehicle.availability;
            });

            const vehicleOptions = availableVehiclesForCurrentLocation.map(vehicle => {
                let obj = {};
                obj.label = vehicle.registrationNumber;
                obj.value = vehicle.registrationNumber;
                obj.availability = vehicle.availability;
                return obj;
            });

            let formFieldsClone = formFields.filter(item => item.label !== "Vehicles");
            formFieldsClone.push({
                label: "Vehicles", name: 'vehicleId', register, error: errors.vehicleId ? errors.vehicleId : {}, type: 'select', options: vehicleOptions
            })
            setFormFields(formFieldsClone);
        }
    }, [deliveryLocation, errors.vehicleId, formFields, register, vehiclesState]);

    const onSubmit = (data, e) => {
        let formData = {
            orderId: v4(),
            ...data,
        }
        let formDataClone = { ...formData }

        // converting list of items to array
        let items = [];
        let index = 1;
        // eslint-disable-next-line
        for (let key in formData) {
            items.push(formData[`item${index}`]);
            delete formDataClone[`item${index}`];
            index++;
        }

        // Filtering truthy values
        const itemsTruthyValues = items.filter(item => item && item);

        // Creating item obj to get itemId from items initialState
        let finalItems = [];
        itemsTruthyValues.forEach(item => {
            const currentValue = itemsState.filter(item1 => item1.id === item);
            finalItems.push(currentValue[0])
        })

        formDataClone = { ...formDataClone, items: finalItems, totalPrice, deliveryLocation }
        let vehicleStateClone = [...vehiclesState];

        const submittedIndex = vehiclesState.findIndex(item => item.registrationNumber === formDataClone.vehicleId);
        vehicleStateClone[submittedIndex] = {
            ...vehicleStateClone[submittedIndex],
            availability: false
        }
        dispatch(updateVehicles(vehicleStateClone));
        dispatch(addOrder(formDataClone));
        e.target.reset()
        setDeliveryLocation("")
        setItemCount([1]);
        toast.dark("Order added!");
    }

    const handleAddItem = () => {
        let itemCountClone = [...itemCount];
        itemCountClone.push(itemCount.length + 1);
        setItemCount(itemCountClone);
    }
    return (
        <>
            <h1> Add Order </h1>
            <form onSubmit={handleSubmit(onSubmit)} >
                {formFields.map(field => (
                    <FormFields key={field.name} {...field} />
                ))}
                <label> Items: </label>
                {itemCount.map((count, index) => {
                    return (
                        <div key={index} >
                            <select name={`item${count}`} ref={register} >
                                <option value="" > Select </option>
                                {itemsState.map(item => {
                                    return <option key={item.id} value={item.id}> {item.itemName} </option>
                                })}
                            </select> <br />
                            {errors && errors[`item${count}`] && (
                                <p className="errorMessage">{errors[`item${count}`].message}</p>
                            )}
                        </div>
                    )
                })}
                <input type="button" onClick={handleAddItem} value="Add" /><br />
                <label> Total Price </label>
                <input type="text" value={totalPrice} disabled /> <br />
                <label> Delivery Location </label>
                <input type="text" value={deliveryLocation} disabled /> <br />
                <input type="submit" value="Place Order" />
            </form>
        </>
    )
}

export default AddOrder