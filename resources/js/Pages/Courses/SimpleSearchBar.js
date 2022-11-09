import React, { useState, useEffect } from 'react';
import pickBy from 'lodash/pickBy';
import { usePage } from '@inertiajs/inertia-react';
import { usePrevious } from 'react-use';
import { Inertia } from '@inertiajs/inertia';

const SimpleSearchBar = ({ placeHolder }) => {
    const { filters } = usePage().props;

    const [values, setValues] = useState({
        search: filters.search || ''
    });

    const prevValues = usePrevious(values);

    function reset() {
        setValues({
            search: ''
        });
    }

    useEffect(() => {
        if (prevValues) {
            const query = Object.keys(pickBy(values)).length
                ? pickBy(values)
                : {};
            Inertia.get(route(route().current()), query, {
                replace: true,
                preserveState: true
            });
        }
    }, [values]);

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;

        setValues(values => ({
            ...values,
            [key]: value
        }));
    }

    return (
        <>
            <div className=" d-flex align-items-center position-relative my-1">
                <span className="icon icon-3 position-absolute ms-3"><i className="bi bi-search"></i></span>
                <input type="text" className="w-100 form-control form-control-solid form-select-md ps-9" style={{ width: "315px" }}
                    autoComplete="off"
                    name="search"
                    value={values.search}
                    onChange={handleChange}
                    placeholder={placeHolder}
                />
                {(values.search && <button
                    onClick={reset}
                    className="btn btn-sm btn-default"
                    type="button"
                >
                    X
                </button>)}
            </div>
        </>
    )
}

export default SimpleSearchBar;
