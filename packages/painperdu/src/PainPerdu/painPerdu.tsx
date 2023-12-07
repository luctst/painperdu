import React from 'react';

export const PainPerdu = () => {
  const [count, setCount] = React.useState(0);

	function incrementCount() {
		setCount(count + 1);
	}

  return (
		<section>
			<h1> Ca part sur du pain perdu </h1>
			<button
				style={{ marginLeft: '10%' }}
				onClick={incrementCount}
			>
				Go +1
			</button>
			<div style={{ textAlign: 'center' }}>
				{ count }
			</div>
		</section>
  );
};
