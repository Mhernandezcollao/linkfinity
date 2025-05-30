import { useState } from 'react';

export const useForm = <T extends object>(initState: T) => {
	// //console.log(initState);
	const [state, setState] = useState(initState);

	const onChange = (value: any, field: keyof T) => {
		setState({
			...state,
			[field]: value,
		});
	};

	const resetForm = () => {
		const new_state: any = state;
		const value = '';

		for (let property in state) {
			new_state[property] = value;
		};

		setState(new_state);
	};

	return {
		...state,
		form: state,
		onChange,
		resetForm
	};
};