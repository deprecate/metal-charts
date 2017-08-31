'use strict';

import {JSXComponent} from 'metal-jsx';

//import ChartBase from '../ChartBase';

/**
 * Metal Chart component for use with JSX.
 */
class ChartJSX extends JSXComponent {
	render() {
		return <div class="jsx">
			Hey There!
		</div>;
	}
}

export {ChartJSX};
export default ChartJSX;
