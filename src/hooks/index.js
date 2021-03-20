import { useState } from 'react'

export const useField = (type) => {
    const [value, setValue] = useState('')


    console.log('MITÄ TULEE CUSTOM HOOKIIN TYPEEN ', type)
    const onChange = (event) => {
        console.log('MITÄ TULEE CUSTOM HOOKIIN onChangeen', event.target.value)
        setValue(event.target.value)
    }
    console.log('TULEEKO SITTEN TÄHÄN')
    const reset = () => {
        console.log('TULEEKO RESETTIIN')
        setValue('')

    }

    return {
        type,
        value,
        onChange,
        reset
    }
}