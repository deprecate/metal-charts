'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.StepChart = undefined;

var _metalState = require('metal-state');

var _Chart2 = require('./Chart');

var _Chart3 = _interopRequireDefault(_Chart2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Step Chart component.
 */
var StepChart = function (_Chart) {
	_inherits(StepChart, _Chart);

	function StepChart() {
		_classCallCheck(this, StepChart);

		return _possibleConstructorReturn(this, (StepChart.__proto__ || Object.getPrototypeOf(StepChart)).apply(this, arguments));
	}

	return StepChart;
}(_Chart3.default);

StepChart.STATE = {
	/**
  * The variety of chart that will be rendered.
  * @instance
  * @memberof StepChart
  * @type {?string|undefined}
  * @default step
  */
	type: _metalState.Config.oneOf(['area', 'area-spline', 'area-step', 'bar', 'line', 'scatter', 'spline', 'step']).value('step')
};

exports.StepChart = StepChart;
exports.default = StepChart;