console.log('coucou')

import { useState } from 'react'

function Test() {
	const [ state, setState ] = useState(0)

	return (
		<>
			<div>
				<h1> Count: {state} </h1>
				<button onclick={ setState(state + 1) }> Click to add </button>
			</div>
		</>
	);
}

export default Test