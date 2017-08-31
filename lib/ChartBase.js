'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ChartBase = exports.d3 = exports.bb = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _metalComponent = require('metal-component');

var _metalComponent2 = _interopRequireDefault(_metalComponent);

var _metalState = require('metal-state');

var _billboard = require('billboard.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base Chart component.
 */
var ChartBase = function (_Component) {
	_inherits(ChartBase, _Component);

	function ChartBase() {
		_classCallCheck(this, ChartBase);

		return _possibleConstructorReturn(this, (ChartBase.__proto__ || Object.getPrototypeOf(ChartBase)).apply(this, arguments));
	}

	_createClass(ChartBase, [{
		key: 'attached',
		value: function attached() {
			var config = this.constructChartConfig_();

			this.bbChart = _billboard.bb.generate(config);

			this.on('columnsChanged', this.handleColumnsChanged_.bind(this));
			this.on('regionsChanged', this.handleRegionsChanged_.bind(this));
			this.on('sizeChanged', this.handleSizeChanged_.bind(this));
			this.on('typeChanged', this.handleTypeChanged_.bind(this));
		}

		/**
   * Constructs `axis` billboard config property.
   * @return {Object}
   * @protected
   */

	}, {
		key: 'constructAxisConfig_',
		value: function constructAxisConfig_() {
			var state = this.getStateObj_();

			return {
				rotated: state.axisRotated,
				x: state.axisX,
				y2: state.axisY2,
				y: state.axisY
			};
		}

		/**
   * Constructs config object for `bb.generate` method.
   * @return {Object}
   * @protected
   */

	}, {
		key: 'constructChartConfig_',
		value: function constructChartConfig_() {
			var state = this.getStateObj_();

			var axis = this.constructAxisConfig_();
			var data = this.constructDataConfig_();
			var zoom = this.constructZoomConfig_();

			var config = {
				area: area,
				axis: axis,
				bindto: this.element,
				color: state.color,
				data: data,
				line: state.line,
				padding: state.padding,
				pie: state.pie,
				point: state.point,
				regions: state.regions,
				resize: state.resizeAuto,
				size: state.size,
				spline: state.splineInterpolationType,
				subchart: state.subchart,
				svg: state.svgClassname,
				title: state.title,
				tooltip: state.tooltip,
				transition: state.transitionDuration,
				zoom: state.zoom
			};

			/**
    * Chart init event.
    * @event chartInit
    * @memberof ChartBase
    */
			config.oninit = this.emitChartEvent_.bind(this, 'chartInit');
			/**
    * Chart mouse out event.
    * @event chartMouseout
    * @memberof ChartBase
    */
			config.onout = this.emitChartEvent_.bind(this, 'chartMouseout');
			/**
    * Chart mouse over event.
    * @event chartMouseover
    * @memberof ChartBase
    */
			config.onover = this.emitChartEvent_.bind(this, 'chartMouseover');
			/**
    * Chart rendered event.
    * @event chartRendered
    * @memberof ChartBase
    */
			config.onrendered = this.emitChartEvent_.bind(this, 'chartRendered');
			/**
    * Chart resize event.
    * @event chartResize
    * @memberof ChartBase
    */
			config.onresize = this.emitChartEvent_.bind(this, 'chartResize');
			/**
    * Chart resized event.
    * @event chartResized
    * @memberof ChartBase
    */
			config.onresized = this.emitChartEvent_.bind(this, 'chartResized');

			return config;
		}

		/**
   * Constructs `data` billboard config property.
   * @return {Object}
   * @protected
   */

	}, {
		key: 'constructDataConfig_',
		value: function constructDataConfig_() {
			var state = this.getStateObj_();

			var config = {
				axes: state.axes,
				classes: state.classes,
				color: state.colorFormatter,
				colors: state.colors,
				columns: state.columns,
				empty: state.emptyLabelText,
				groups: state.groups,
				hide: state.hide,
				json: state.json,
				keys: state.keys,
				labels: state.labels,
				mimeType: state.mimeType,
				names: state.names,
				order: state.order,
				rows: state.rows,
				selection: state.selection,
				type: state.type,
				types: state.types,
				url: state.url

				/**
     * Point click event.
     * @event pointClick
     * @memberof ChartBase
     */
			};config.onclick = this.emitChartEvent_.bind(this, 'pointClick');
			/**
    * Point mouse out event.
    * @event pointMouseout
    * @memberof ChartBase
    */
			config.onout = this.emitChartEvent_.bind(this, 'pointMouseout');
			/**
    * Point mouse over event.
    * @event pointMouseoever
    * @memberof ChartBase
    */
			config.onover = this.emitChartEvent_.bind(this, 'pointMouseover');
			/**
    * Data select event.
    * @event dataSelect
    * @memberof ChartBase
    */
			config.onselect = this.emitChartEvent_.bind(this, 'dataSelect');
			/**
    * Data unselected event.
    * @event dataUnselected
    * @memberof ChartBase
    */
			config.onunselected = this.emitChartEvent_.bind(this, 'dataUnselected');

			return config;
		}

		/**
   * Constructs `zoom` billboard config property.
   * @return {Object}
   * @protected
   */

	}, {
		key: 'constructZoomConfig_',
		value: function constructZoomConfig_() {
			var state = this.getStateObj_();

			var zoom = state.zoom;

			var config = zoom || {};

			/**
    * Zoom event.
    * @event zoom
    * @memberof ChartBase
    */
			config.onzoom = this.emitChartEvent_.bind(this, 'zoom');
			/**
    * Zoom end event.
    * @event zoomEnd
    * @memberof ChartBase
    */
			config.onzoomend = this.emitChartEvent_.bind(this, 'zoomEnd');
			/**
    * Zoom start event.
    * @event zoomStart
    * @memberof ChartBase
    */
			config.onzoomstart = this.emitChartEvent_.bind(this, 'zoomStart');

			return config;
		}

		/**
   * Retrieves state object, used to allow JSX implementation.
   * @return {Object}
   * @protected
   */

	}, {
		key: 'getStateObj_',
		value: function getStateObj_() {
			return this;
		}

		/**
   * Emits event based on arguments array.
   * @protected
   */

	}, {
		key: 'emitChartEvent_',
		value: function emitChartEvent_() {
			this.emit.apply(this, arguments);
		}

		/**
   * Maps `columns` state to chart via `bb.load` method.
   * @protected
   */

	}, {
		key: 'handleColumnsChanged_',
		value: function handleColumnsChanged_(_ref) {
			var newVal = _ref.newVal,
			    prevVal = _ref.prevVal;

			var data = {
				columns: newVal
			};

			var removedIds = this.resolveRemovedColumns_(newVal, prevVal);

			if (removedIds.length) {
				data.unload = removedIds;
			}

			this.bbChart.load(data);
		}

		/**
   * Maps `regions` state to chart via `bb.regions` method.
   * @protected
   */

	}, {
		key: 'handleRegionsChanged_',
		value: function handleRegionsChanged_(_ref2) {
			var newVal = _ref2.newVal;

			this.bbChart.regions(newVal);
		}

		/**
   * Maps `size` state to chart via `bb.resize` method.
   * @protected
   */

	}, {
		key: 'handleSizeChanged_',
		value: function handleSizeChanged_(_ref3) {
			var newVal = _ref3.newVal;

			this.bbChart.resize(newVal);
		}

		/**
   * Maps `type` state to chart via `bb.transform` method.
   * @protected
   */

	}, {
		key: 'handleTypeChanged_',
		value: function handleTypeChanged_(_ref4) {
			var newVal = _ref4.newVal;

			this.bbChart.transform(newVal);
		}

		/**
   * Determines which ids should be passed to the unload property.
   * @static
   * @type {!Object}
   */

	}, {
		key: 'resolveRemovedColumns_',
		value: function resolveRemovedColumns_(newColumns, prevColumns) {
			var ids = newColumns.map(function (column) {
				return column[0];
			});

			return prevColumns.reduce(function (removedIds, column) {
				var id = column[0];

				if (ids.indexOf(id) === -1) {
					removedIds.push(id);
				}

				return removedIds;
			}, []);
		}
	}]);

	return ChartBase;
}(_metalComponent2.default);

/**
 * State definition.
 * @static
 * @type {!Object}
 */


ChartBase.STATE = {
	/**
  * Data that will be rendered to the chart.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	area: _metalState.Config.shapeOf({
		above: _metalState.Config.bool().value(false),
		zerobased: _metalState.Config.bool().value(true)
	}),

	/**
  * Sets billboard's data.axes config.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default {}
  */
	axes: _metalState.Config.object(),

	/**
  * Switches the x and y axis.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	axisRotated: _metalState.Config.bool(),

	/**
  * Styling and behavior of x axis.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	axisX: {
		categories: _metalState.Config.array(),
		extent: _metalState.Config.array(),
		height: _metalState.Config.number(),
		label: _metalState.Config.object().string(),
		localtime: _metalState.Config.bool(),
		max: _metalState.Config.number(),
		min: _metalState.Config.number(),
		padding: _metalState.Config.object(),
		show: _metalState.Config.bool(),
		tick: _metalState.Config.shapeOf({
			centered: _metalState.Config.bool(),
			count: _metalState.Config.number(),
			culling: _metalState.Config.bool().shapeOf({
				max: _metalState.Config.number()
			}),
			fit: _metalState.Config.bool(),
			format: _metalState.Config.func(),
			multiline: _metalState.Config.bool(),
			outer: _metalState.Config.bool(),
			rotate: _metalState.Config.number(),
			values: _metalState.Config.array(),
			width: _metalState.Config.number()
		}),
		type: _metalState.Config.oneOf(['category', 'indexed', 'timeseries'])
	},

	/**
  * Styling and behavior of y2 axis.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	axisY2: _metalState.Config.shapeOf({
		center: _metalState.Config.number(),
		default: _metalState.Config.array(),
		inner: _metalState.Config.bool(),
		inverted: _metalState.Config.bool(),
		label: _metalState.Config.object().string(),
		max: _metalState.Config.number(),
		min: _metalState.Config.number(),
		padding: _metalState.Config.number(),
		show: _metalState.Config.bool(),
		tick: _metalState.Config.shapeOf({
			count: _metalState.Config.number(),
			format: _metalState.Config.func(),
			outer: _metalState.Config.bool(),
			values: _metalState.Config.array()
		})
	}),

	/**
  * Styling and behavior of y axis.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	axisY: {
		center: _metalState.Config.number(),
		default: _metalState.Config.array(),
		format: _metalState.Config.func(),
		inner: _metalState.Config.bool(),
		inverted: _metalState.Config.bool(),
		label: _metalState.Config.object().string(),
		max: _metalState.Config.number(),
		min: _metalState.Config.number(),
		padding: _metalState.Config.object().string(),
		show: _metalState.Config.bool(),
		tick: _metalState.Config.shapeOf({
			count: _metalState.Config.bool(),
			outer: _metalState.Config.bool(),
			values: _metalState.Config.array()
		}),
		type: _metalState.Config.oneOf(['category', 'indexed', 'timeseries'])
	},

	/**
  * Styling and behavior of bars.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	bar: _metalState.Config.shapeOf({
		width: _metalState.Config.number(),
		zerobased: _metalState.Config.bool()
	}),

	/**
  * Sets billboard's data.classes config.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default {}
  */
	classes: _metalState.Config.object(),

	/**
  * Defines a custom color pattern for chart.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	color: _metalState.Config.shapeOf({
		pattern: _metalState.Config.array(),
		threshhold: _metalState.Config.shapeOf({
			unit: _metalState.Config.string(),
			value: _metalState.Config.array(),
			max: _metalState.Config.number()
		})
	}),

	/**
  * Sets billboard's data.color config.
  * @instance
  * @memberof ChartBase
  * @type {?Function|undefined}
  * @default undefined
  */
	colorFormatter: _metalState.Config.func(),

	/**
  * Data that will be rendered to the chart.
  * @instance
  * @memberof ChartBase
  * @type {?Array|undefined}
  * @default []
  */
	columns: _metalState.Config.array().value([]),

	/**
  * Configuration options for donut chart.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	donut: _metalState.Config.shapeOf({
		label: _metalState.Config.shapeOf({
			show: _metalState.Config.bool(),
			format: _metalState.Config.func(),
			threshhold: _metalState.Config.number(),
			ratio: _metalState.Config.func().number()
		}),
		expand: _metalState.Config.bool(),
		width: _metalState.Config.number(),
		title: _metalState.Config.string(),
		padAngle: _metalState.Config.number()
	}),

	/**
  * Sets label for when no data is loaded.
  * @instance
  * @memberof ChartBase
  * @type {?String|undefined}
  * @default ""
  */
	emptyLabelText: _metalState.Config.string().setter(function (value) {
		return {
			empty: {
				label: {
					text: value
				}
			}
		};
	}),

	/**
  * Configuration options for guage chart.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	gauge: _metalState.Config.shapeOf({
		fullCircle: _metalState.Config.bool(),
		lable: _metalState.Config.shapeOf({
			show: _metalState.Config.bool(),
			format: _metalState.Config.func()
		}),
		expand: _metalState.Config.bool(),
		min: _metalState.Config.number(),
		max: _metalState.Config.number(),
		startingAngle: _metalState.Config.number(),
		units: _metalState.Config.string(),
		width: _metalState.Config.number()
	}),

	/**
  * Configuration options for grid chart.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	grid: _metalState.Config.shapeOf({ // Cross reference this with source code, have a feeling this info is wrong
		focus: _metalState.Config.shapeOf({
			show: _metalState.Config.bool()
		}),
		lines: _metalState.Config.shapeOf({
			front: _metalState.Config.bool()
		}),
		x: _metalState.Config.shapeOf({
			show: _metalState.Config.bool(),
			lines: _metalState.Config.shapeOf({
				class: _metalState.Config.string(),
				position: _metalState.Config.oneOf(['start', 'middle', 'end']),
				text: _metalState.Config.string(),
				value: _metalState.Config.string()
			})
		}),
		y: _metalState.Config.shapeOf({
			show: _metalState.Config.bool(),
			lines: _metalState.Config.shapeOf({
				class: _metalState.Config.string(),
				position: _metalState.Config.oneOf(['start', 'middle', 'end']),
				text: _metalState.Config.string(),
				value: _metalState.Config.string()
			})
		}),
		ticks: _metalState.Config.number()
	}),

	/**
  * Sets billboard's data.groups config.
  * @instance
  * @memberof ChartBase
  * @type {?Array|undefined}
  * @default []
  */
	groups: _metalState.Config.array(),

	/**
  * Sets billboard's data.hide config.
  * @instance
  * @memberof ChartBase
  * @type {?Array|bool|undefined}
  * @default []
  */
	hide: _metalState.Config.array().bool().value(false),

	/**
  * intersection TODO.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default undefined
  */
	intersection: _metalState.Config.shapeOf({
		enabled: _metalState.Config.bool(),
		brighten: _metalState.Config.bool(),
		inputType: _metalState.Config.shapeOf({
			mouse: _metalState.Config.bool(),
			touch: _metalState.Config.bool()
		})
	}),

	/**
  * Sets billboard's data.json config.
  * @instance
  * @memberof ChartBase
  * @type {?Array|bool|undefined}
  * @default []
  */
	json: _metalState.Config.array(),

	/**
  * Sets billboard's data.keys config.
  * @instance
  * @memberof ChartBase
  * @type {?Array|undefined}
  * @default []
  */
	keys: _metalState.Config.array().setter(function (value) {
		return {
			value: value
		};
	}),

	/**
  * Sets billboard's data.labels config.
  * @instance
  * @memberof ChartBase
  * @type {?boolean|function|undefined}
  * @default {}
  */
	labels: _metalState.Config.bool().func().setter(function (value) {
		if (typeof value === 'boolean') {
			return {
				labels: value
			};
		} else {
			return {
				labels: {
					format: value
				}
			};
		}
	}),

	/**
  * legend TODO.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default undefined
  */
	legend: _metalState.Config.shapeOf({
		show: _metalState.Config.bool(),
		hide: _metalState.Config.bool(),
		position: _metalState.Config.oneOf(['bottom', 'inset', 'right']),
		inset: _metalState.Config.shapeOf({
			anchor: _metalState.Config.oneOf(['bottom-left', 'bottom-right', 'top-left', 'top-right']),
			step: _metalState.Config.number(),
			x: _metalState.Config.number(),
			y: _metalState.Config.number()
		})
	}),

	/**
  * Display settings for chart lines.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default undefined
  */
	line: _metalState.Config.shapeOf({
		connectNull: _metalState.Config.bool(),
		step: _metalState.Config.shapeOf({
			type: _metalState.Config.oneOf(['step', 'step-after', 'step-before'])
		})
	}),

	/**
  * Sets billboard's data.mimeType config.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default undefined
  */
	mimeType: _metalState.Config.string(),

	/**
  * Sets billboard's data.names config.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	names: _metalState.Config.object(),

	/**
  * Sets billboard's data.order config.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default "desc"
  */
	order: _metalState.Config.string().value('desc'),

	/**
  * Sets padding on chart.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default undefined
  */
	padding: _metalState.Config.shapeOf({
		bottom: _metalState.Config.number(),
		left: _metalState.Config.number(),
		right: _metalState.Config.number(),
		top: _metalState.Config.number()
	}),

	/**
  * Configuration options for pie chart.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	pie: _metalState.Config.shapeOf({
		label: _metalState.Config.shapeOf({
			show: _metalState.Config.bool(),
			format: _metalState.Config.func(),
			threshhold: _metalState.Config.number(),
			ratio: _metalState.Config.func().number()
		}),
		expand: _metalState.Config.bool(),
		padAngle: _metalState.Config.number()
	}),

	/**
  * Configuration options for chart points.
  * @instance
  * @memberof ChartBase
  * @type {?Object|undefined}
  * @default undefined
  */
	point: _metalState.Config.shapeOf({
		show: _metalState.Config.bool(),
		r: _metalState.Config.number(),
		focus: _metalState.Config.shapeOf({
			expand: _metalState.Config.shapeOf({
				enabled: _metalState.Config.bool(),
				r: _metalState.Config.bool()
			}),
			select: _metalState.Config.shapeOf({
				r: _metalState.Config.number()
			})
		})
	}),

	/**
  * Creates custom regions on chart that can be styled.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	regions: _metalState.Config.shapeOf({
		class: _metalState.Config.string(),
		enabled: _metalState.Config.oneOf(['x', 'y']).required(),
		end: _metalState.Config.array().required(),
		start: _metalState.Config.number().required()
	}),

	/**
  * Determines if chart auto resizes when viewport size changes.
  * @instance
  * @memberof ChartBase
  * @type {?boolean|undefined}
  * @default undefined
  */
	resizeAuto: _metalState.Config.bool().setter(function (value) {
		return {
			auto: value
		};
	}),

	/**
  * Load data from a multidimensional array. Sets billboard's `data.rows`
  * config.
  * @instance
  * @memberof ChartBase
  * @type {?array|undefined}
  * @default undefined
  */
	rows: _metalState.Config.array(),

	/**
  * Sets billboard's `data.selection` config.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default undefined
  */
	selection: _metalState.Config.shapeOf({
		draggable: _metalState.Config.bool(),
		enabled: _metalState.Config.bool(),
		grouped: _metalState.Config.bool(),
		isselectable: _metalState.Config.func(),
		multiple: _metalState.Config.bool()
	}),

	/**
  * Sets size of chart.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	size: _metalState.Config.shapeOf({
		height: _metalState.Config.number(),
		width: _metalState.Config.number()
	}),

	/**
  * Determines interpolation type of spline charts.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default undefined
  */
	splineInterpolationType: _metalState.Config.string().setter(function (value) {
		return {
			interpolation: {
				type: value
			}
		};
	}),

	/**
  * Config options for subcharts.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	subchart: _metalState.Config.shapeOf({
		show: _metalState.Config.bool(),
		size: _metalState.Config.shapeOf({
			height: _metalState.Config.number()
		}),
		onbrush: _metalState.Config.func()
	}),

	/**
  * Customizes classname for svg element.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default undefined
  */
	svgClassname: _metalState.Config.string().setter(function (value) {
		return {
			classname: value
		};
	}),

	/**
  * Display options for title element.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	title: _metalState.Config.shapeOf({
		text: _metalState.Config.string(),
		padding: _metalState.Config.shapeOf({
			bottom: _metalState.Config.number(),
			left: _metalState.Config.number(),
			right: _metalState.Config.number(),
			top: _metalState.Config.number()
		}),
		position: _metalState.Config.string()
	}),

	/**
  * Display options for tooltip.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	tooltip: _metalState.Config.shapeOf({
		show: _metalState.Config.bool(),
		grouped: _metalState.Config.bool(),
		format: _metalState.Config.shapeOf({
			name: _metalState.Config.func(),
			title: _metalState.Config.func(),
			value: _metalState.Config.func()
		}),
		contents: _metalState.Config.func()
	}),

	/**
  * Sets duration of transitions.
  * @instance
  * @memberof ChartBase
  * @type {?number|undefined}
  * @default undefined
  */
	transitionDuration: _metalState.Config.number().setter(function (value) {
		return {
			duration: value
		};
	}),

	/**
  * The variety of chart that will be rendered.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default line
  */
	type: _metalState.Config.oneOf(['area', 'area-spline', 'area-step', 'bar', 'donut', 'gauge', 'line', 'pie', 'scatter', 'spline', 'step']).value('line'),

	/**
  * The variety of chart that will be rendered by column.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default {}
  */
	types: _metalState.Config.object(),

	/**
  * Load a CSV or JSON file from a URL.
  * @instance
  * @memberof ChartBase
  * @type {?string|undefined}
  * @default undefined
  */
	url: _metalState.Config.string(),

	/**
  * Configuration for bb chart zoom capabilities.
  * @instance
  * @memberof ChartBase
  * @type {?object|undefined}
  * @default {}
  */
	zoom: _metalState.Config.shapeOf({
		enabled: _metalState.Config.bool().value(true),
		rescale: _metalState.Config.bool().value(false),
		extent: _metalState.Config.array()
	})
};

exports.bb = _billboard.bb;
exports.d3 = _billboard.d3;
exports.ChartBase = ChartBase;
exports.default = ChartBase;