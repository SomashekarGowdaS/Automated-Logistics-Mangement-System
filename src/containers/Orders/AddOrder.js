import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';
import FormFields from '../../components/FormFields';

const initSchema = {
    customerId: yup.string().required(),
    vehicleId: yup.string().required()
}

const AddOrder = (props) => {
    const [schema, setSchema] = useState(initSchema)
    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(yup.object().shape(schema)),
    });
    const watchAllFields = watch();

    const vehicles = useSelector((state) => {
        return state.vehicles;
    });
    const itemsState = useSelector((state) => {
        return state.items;
    });
    const customers = useSelector((state) => {
        return state.customers;
    });
    const [totalPrice, setTotalPrice] = useState(0);

    const [formFields, setFormFields] = useState([]);
    const [itemCount, setItemCount] = useState([1]);

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
    }, [itemCount])

    useEffect(() => {
        const customerOptions = customers.map(customer => {
            let obj = {};
            obj.label = customer.customerName;
            obj.value = customer.id;
            return obj;
        });
        const vehicleOptions = vehicles.map(vehicle => {
            let obj = {};
            obj.label = vehicle.registrationNumber;
            obj.value = vehicle.registrationNumber;
            return obj
        })
        const formFields = [
            { label: "Customers", name: 'customerId', register, error: errors.customers ? errors.customers : {}, type: 'select', options: customerOptions },
            { label: "Vehicles", name: 'vehicleId', register, error: errors.vehicles ? errors.vehicles : {}, type: 'select', options: vehicleOptions }
        ];
        setFormFields(formFields)
    }, [vehicles, itemsState, customers]);

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
        setTotalPrice(totalPrice)
    }, [watchAllFields]);

    const onSubmit = (data) => {
        let formData = {
            orderId: v4(),
            ...data,
        }
        let formDataClone = { ...formData }

        // converting list of items to array
        let items = [];
        let index = 1
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

        formDataClone = { ...formDataClone, items: finalItems, totalPrice }
        console.log(formDataClone);
    }

    const handleAddItem = () => {
        let itemCountClone = [...itemCount];
        itemCountClone.push(itemCount.length + 1);
        setItemCount(itemCountClone);
    }

    return (
        <div>
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
                        </div>
                    )
                })}
                <input type="button" onClick={handleAddItem} value="Add" /><br />
                <label> Total Price </label>
                <input type="text" value={totalPrice} disabled /> <br />
                <label> Delivery Location </label>
                <input type="text" disabled /> <br />
                <input type="submit" value="Place Order" />
            </form>
        </div>
    )
}

export default AddOrder