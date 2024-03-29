'use strict';

/**
 * @ngdoc service
 * @name app.partitionDataService
 * @description
 * # partitionDataService
 * Service in the app.
 */
angular.module('app')
	.factory('partitionDataService', [function () {
		// AngularJS will instantiate a singleton by calling "new" on this function
		var _partitionData = {
		 "name": "Physical Attributes",
		 "children": [
			{
			 "name": "hair-color",
			 "children": [
				{
				 "name": "women",
				 "children": [
					{"name": "brown", "count": 3938},
					{"name": "CommunityStructure", "count": 3812},
					{"name": "HierarchicalCluster", "count": 6714},
					{"name": "MergeEdge", "count": 743}
				 ]
				},
				{
				 "name": "men",
				 "children": [
					{"name": "BetweennessCentrality", "count": 3534},
					{"name": "LinkDistance", "count": 5731},
					{"name": "MaxFlowMinCut", "count": 7840},
					{"name": "ShortestPaths", "count": 5914},
					{"name": "SpanningTree", "count": 3416}
				 ]
				},
				{
				 "name": "other",
				 "children": [
					{"name": "AspectRatioBanker", "count": 7074}
				 ]
				}
			 ]
			},
			{
			 "name": "animate",
			 "children": [
				{"name": "Easing", "count": 17010},
				{"name": "FunctionSequence", "count": 5842},
				{
				 "name": "interpolate",
				 "children": [
					{"name": "ArrayInterpolator", "count": 1983},
					{"name": "ColorInterpolator", "count": 2047},
					{"name": "DateInterpolator", "count": 1375},
					{"name": "Interpolator", "count": 8746},
					{"name": "MatrixInterpolator", "count": 2202},
					{"name": "NumberInterpolator", "count": 1382},
					{"name": "ObjectInterpolator", "count": 1629},
					{"name": "PointInterpolator", "count": 1675},
					{"name": "RectangleInterpolator", "count": 2042}
				 ]
				},
				{"name": "ISchedulable", "count": 1041},
				{"name": "Parallel", "count": 5176},
				{"name": "Pause", "count": 449},
				{"name": "Scheduler", "count": 5593},
				{"name": "Sequence", "count": 5534},
				{"name": "Transition", "count": 9201},
				{"name": "Transitioner", "count": 19975},
				{"name": "TransitionEvent", "count": 1116},
				{"name": "Tween", "count": 6006}
			 ]
			},
			{
			 "name": "data",
			 "children": [
				{
				 "name": "converters",
				 "children": [
					{"name": "Converters", "count": 721},
					{"name": "DelimitedTextConverter", "count": 4294},
					{"name": "GraphMLConverter", "count": 9800},
					{"name": "IDataConverter", "count": 1314},
					{"name": "JSONConverter", "count": 2220}
				 ]
				},
				{"name": "DataField", "count": 1759},
				{"name": "DataSchema", "count": 2165},
				{"name": "DataSet", "count": 586},
				{"name": "DataSource", "count": 3331},
				{"name": "DataTable", "count": 772},
				{"name": "DataUtil", "count": 3322}
			 ]
			},
			{
			 "name": "display",
			 "children": [
				{"name": "DirtySprite", "count": 8833},
				{"name": "LineSprite", "count": 1732},
				{"name": "RectSprite", "count": 3623},
				{"name": "TextSprite", "count": 10066}
			 ]
			},
			{
			 "name": "flex",
			 "children": [
				{"name": "FlareVis", "count": 4116}
			 ]
			},
			{
			 "name": "physics",
			 "children": [
				{"name": "DragForce", "count": 1082},
				{"name": "GravityForce", "count": 1336},
				{"name": "IForce", "count": 319},
				{"name": "NBodyForce", "count": 10498},
				{"name": "Particle", "count": 2822},
				{"name": "Simulation", "count": 9983},
				{"name": "Spring", "count": 2213},
				{"name": "SpringForce", "count": 1681}
			 ]
			},
			{
			 "name": "query",
			 "children": [
				{"name": "AggregateExpression", "count": 1616},
				{"name": "And", "count": 1027},
				{"name": "Arithmetic", "count": 3891},
				{"name": "Average", "count": 891},
				{"name": "BinaryExpression", "count": 2893},
				{"name": "Comparison", "count": 5103},
				{"name": "CompositeExpression", "count": 3677},
				{"name": "Count", "count": 781},
				{"name": "DateUtil", "count": 4141},
				{"name": "Distinct", "count": 933},
				{"name": "Expression", "count": 5130},
				{"name": "ExpressionIterator", "count": 3617},
				{"name": "Fn", "count": 3240},
				{"name": "If", "count": 2732},
				{"name": "IsA", "count": 2039},
				{"name": "Literal", "count": 1214},
				{"name": "Match", "count": 3748},
				{"name": "Maximum", "count": 843},
				{
				 "name": "methods",
				 "children": [
					{"name": "add", "count": 593},
					{"name": "and", "count": 330},
					{"name": "average", "count": 287},
					{"name": "count", "count": 277},
					{"name": "distinct", "count": 292},
					{"name": "div", "count": 595},
					{"name": "eq", "count": 594},
					{"name": "fn", "count": 460},
					{"name": "gt", "count": 603},
					{"name": "gte", "count": 625},
					{"name": "iff", "count": 748},
					{"name": "isa", "count": 461},
					{"name": "lt", "count": 597},
					{"name": "lte", "count": 619},
					{"name": "max", "count": 283},
					{"name": "min", "count": 283},
					{"name": "mod", "count": 591},
					{"name": "mul", "count": 603},
					{"name": "neq", "count": 599},
					{"name": "not", "count": 386},
					{"name": "or", "count": 323},
					{"name": "orderby", "count": 307},
					{"name": "range", "count": 772},
					{"name": "select", "count": 296},
					{"name": "stddev", "count": 363},
					{"name": "sub", "count": 600},
					{"name": "sum", "count": 280},
					{"name": "update", "count": 307},
					{"name": "variance", "count": 335},
					{"name": "where", "count": 299},
					{"name": "xor", "count": 354},
					{"name": "_", "count": 264}
				 ]
				},
				{"name": "Minimum", "count": 843},
				{"name": "Not", "count": 1554},
				{"name": "Or", "count": 970},
				{"name": "Query", "count": 13896},
				{"name": "Range", "count": 1594},
				{"name": "StringUtil", "count": 4130},
				{"name": "Sum", "count": 791},
				{"name": "Variable", "count": 1124},
				{"name": "Variance", "count": 1876},
				{"name": "Xor", "count": 1101}
			 ]
			},
			{
			 "name": "scale",
			 "children": [
				{"name": "IScaleMap", "count": 2105},
				{"name": "LinearScale", "count": 1316},
				{"name": "LogScale", "count": 3151},
				{"name": "OrdinalScale", "count": 3770},
				{"name": "QuantileScale", "count": 2435},
				{"name": "QuantitativeScale", "count": 4839},
				{"name": "RootScale", "count": 1756},
				{"name": "Scale", "count": 4268},
				{"name": "ScaleType", "count": 1821},
				{"name": "TimeScale", "count": 5833}
			 ]
			},
			{
			 "name": "util",
			 "children": [
				{"name": "Arrays", "count": 8258},
				{"name": "Colors", "count": 10001},
				{"name": "Dates", "count": 8217},
				{"name": "Displays", "count": 12555},
				{"name": "Filter", "count": 2324},
				{"name": "Geometry", "count": 10993},
				{
				 "name": "heap",
				 "children": [
					{"name": "FibonacciHeap", "count": 9354},
					{"name": "HeapNode", "count": 1233}
				 ]
				},
				{"name": "IEvaluable", "count": 335},
				{"name": "IPredicate", "count": 383},
				{"name": "IValueProxy", "count": 874},
				{
				 "name": "math",
				 "children": [
					{"name": "DenseMatrix", "count": 3165},
					{"name": "IMatrix", "count": 2815},
					{"name": "SparseMatrix", "count": 3366}
				 ]
				},
				{"name": "Maths", "count": 17705},
				{"name": "Orientation", "count": 1486},
				{
				 "name": "palette",
				 "children": [
					{"name": "ColorPalette", "count": 6367},
					{"name": "Palette", "count": 1229},
					{"name": "ShapePalette", "count": 2059},
					{"name": "countPalette", "count": 2291}
				 ]
				},
				{"name": "Property", "count": 5559},
				{"name": "Shapes", "count": 19118},
				{"name": "Sort", "count": 6887},
				{"name": "Stats", "count": 6557},
				{"name": "Strings", "count": 22026}
			 ]
			},
			{
			 "name": "vis",
			 "children": [
				{
				 "name": "axis",
				 "children": [
					{"name": "Axes", "count": 1302},
					{"name": "Axis", "count": 24593},
					{"name": "AxisGridLine", "count": 652},
					{"name": "AxisLabel", "count": 636},
					{"name": "CartesianAxes", "count": 6703}
				 ]
				},
				{
				 "name": "controls",
				 "children": [
					{"name": "AnchorControl", "count": 2138},
					{"name": "ClickControl", "count": 3824},
					{"name": "Control", "count": 1353},
					{"name": "ControlList", "count": 4665},
					{"name": "DragControl", "count": 2649},
					{"name": "ExpandControl", "count": 2832},
					{"name": "HoverControl", "count": 4896},
					{"name": "IControl", "count": 763},
					{"name": "PanZoomControl", "count": 5222},
					{"name": "SelectionControl", "count": 7862},
					{"name": "TooltipControl", "count": 8435}
				 ]
				},
				{
				 "name": "data",
				 "children": [
					{"name": "Data", "count": 20544},
					{"name": "DataList", "count": 19788},
					{"name": "DataSprite", "count": 10349},
					{"name": "EdgeSprite", "count": 3301},
					{"name": "NodeSprite", "count": 19382},
					{
					 "name": "render",
					 "children": [
						{"name": "ArrowType", "count": 698},
						{"name": "EdgeRenderer", "count": 5569},
						{"name": "IRenderer", "count": 353},
						{"name": "ShapeRenderer", "count": 2247}
					 ]
					},
					{"name": "ScaleBinding", "count": 11275},
					{"name": "Tree", "count": 7147},
					{"name": "TreeBuilder", "count": 9930}
				 ]
				},
				{
				 "name": "events",
				 "children": [
					{"name": "DataEvent", "count": 2313},
					{"name": "SelectionEvent", "count": 1880},
					{"name": "TooltipEvent", "count": 1701},
					{"name": "VisualizationEvent", "count": 1117}
				 ]
				},
				{
				 "name": "legend",
				 "children": [
					{"name": "Legend", "count": 20859},
					{"name": "LegendItem", "count": 4614},
					{"name": "LegendRange", "count": 10530}
				 ]
				},
				{
				 "name": "operator",
				 "children": [
					{
					 "name": "distortion",
					 "children": [
						{"name": "BifocalDistortion", "count": 4461},
						{"name": "Distortion", "count": 6314},
						{"name": "FisheyeDistortion", "count": 3444}
					 ]
					},
					{
					 "name": "encoder",
					 "children": [
						{"name": "ColorEncoder", "count": 3179},
						{"name": "Encoder", "count": 4060},
						{"name": "PropertyEncoder", "count": 4138},
						{"name": "ShapeEncoder", "count": 1690},
						{"name": "countEncoder", "count": 1830}
					 ]
					},
					{
					 "name": "filter",
					 "children": [
						{"name": "FisheyeTreeFilter", "count": 5219},
						{"name": "GraphDistanceFilter", "count": 3165},
						{"name": "VisibilityFilter", "count": 3509}
					 ]
					},
					{"name": "IOperator", "count": 1286},
					{
					 "name": "label",
					 "children": [
						{"name": "Labeler", "count": 9956},
						{"name": "RadialLabeler", "count": 3899},
						{"name": "StackedAreaLabeler", "count": 3202}
					 ]
					},
					{
					 "name": "layout",
					 "children": [
						{"name": "AxisLayout", "count": 6725},
						{"name": "BundledEdgeRouter", "count": 3727},
						{"name": "CircleLayout", "count": 9317},
						{"name": "CirclePackingLayout", "count": 12003},
						{"name": "DendrogramLayout", "count": 4853},
						{"name": "ForceDirectedLayout", "count": 8411},
						{"name": "IcicleTreeLayout", "count": 4864},
						{"name": "IndentedTreeLayout", "count": 3174},
						{"name": "Layout", "count": 7881},
						{"name": "NodeLinkTreeLayout", "count": 12870},
						{"name": "PieLayout", "count": 2728},
						{"name": "RadialTreeLayout", "count": 12348},
						{"name": "RandomLayout", "count": 870},
						{"name": "StackedAreaLayout", "count": 9121},
						{"name": "TreeMapLayout", "count": 9191}
					 ]
					},
					{"name": "Operator", "count": 2490},
					{"name": "OperatorList", "count": 5248},
					{"name": "OperatorSequence", "count": 4190},
					{"name": "OperatorSwitch", "count": 2581},
					{"name": "SortOperator", "count": 2023}
				 ]
				},
				{"name": "Visualization", "count": 16540}
			 ]
			}
		 ]
		};

		return {
			data: _partitionData
		};

	}]);
