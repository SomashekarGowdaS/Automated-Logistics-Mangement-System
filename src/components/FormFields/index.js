import React, { Fragment } from 'react'

export default function FormFields(props) {
    const { label, name, error, register, type, options } = props;
    const getInputType = () => {
        switch (type) {
            case 'select':
                return (
                    <Fragment>
                        <label>{label}</label>
                        <select name={name} ref={register}>
                            <option value="" hidden>Select</option>
                            {options.map(item => (
                                <option disabled={item.disabled} key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </select> <br />
                        {error && (
                            <p>{error.message}</p>
                        )}
                    </Fragment>
                );
            default:
                return (
                    <Fragment>
                        <label>{label}</label>
                        <input type="text" name={name} ref={register} /> <br />
                        {error && (
                            <p>{error.message}</p>
                        )}
                    </Fragment>
                )
        }
    }
    return (
        getInputType()
    )
}
