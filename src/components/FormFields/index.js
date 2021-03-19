import React, { Fragment } from 'react'
import './styles.css';

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
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </select> <br />
                        {error && (
                            <p className="errorMessage">{error.message}</p>
                        )}
                    </Fragment>
                );
            default:
                return (
                    <Fragment>
                        <label>{label}</label>
                        <input type="text" name={name} ref={register} /> <br />
                        {error && (
                            <p className="errorMessage">{error.message}</p>
                        )}
                    </Fragment>
                )
        }
    }
    return (
        getInputType()
    )
}
