/// <reference path="servicnowCommon.d.ts" />

/**
 * "ttb"="Transform business"; "gtb"="Grow business"; "rtb"="Run business"
 */
declare type PortfolioCategory = "ttb" | "gtb" | "rtb";

/**
 * GlideElement values from the Portfolio table.
 * @interface pm_portfolioFields
 */
declare interface pm_portfolioFields extends IGlideTableProperties {
	/**
	 * Active
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_portfolioFields
	 */
	active: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Category
	 * @type {$$rhino.Nilable<$$property.generic.Element<PortfolioCategory>>}
	 * @memberof pm_portfolioFields
	 */
	category: $$rhino.Nilable<$$property.generic.Element<PortfolioCategory>>;

	/**
	 * Description
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	description: $$rhino.Nilable<$$property.Element>;

	/**
	 * Name
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	name: $$rhino.Nilable<$$property.Element>;

	/**
	 * Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 * @summary Portfolio manager
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof pm_portfolioFields
	 */
	portfolio_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

	/**
	 * Gets a choice value representing the Portfolio Planning value ("advanced"="Advanced"; "simple"="Simple").
	 * @summary Portfolio planning
	 * @type {IStringBasedGlideElement<("advanced" | "simple")>}
	 * @memberof pm_portfolioFields
	 */
	portfolio_planning: $$rhino.Nilable<$$property.generic.Element<("advanced" | "simple")>>;

	/**
	 * Gets the state value ("define"="Define"; "analyse"="Analyze"; "approve"="Approve"; "charter"="Charter").
	 * @summary State
	 * @type {IStringBasedGlideElement<("define" | "analyse" | "approve" | "charter")>}
	 * @memberof pm_portfolioFields
	 */
	state: $$rhino.Nilable<$$property.generic.Element<("define" | "analyse" | "approve" | "charter")>>;

	/**
	 * Gets the task type. Internal type is "sys_class_name".
	 * @summary Task type
	 * @type {GlideElement}
	 * @memberof pm_portfolioFields
	 */
	sys_class_name: GlideElement;

	/**
	 * Created by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	sys_created_by: $$rhino.Nilable<$$property.Element>;

	/**
	 * Gets the record creation date/time value. Internal type is glide_date_time.
	 * @summary Created
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	sys_created_on: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is "domain_id"
	 * @summary Domain
	 * @type {GlideElement}
	 * @memberof pm_portfolioFields
	 */
	sys_domain: GlideElement;

	/**
	 * Internal type is integer
	 * @summary Updates
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_portfolioFields
	 */
	sys_mod_count: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Updated by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	sys_updated_by: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_date_time
	 * @summary Updated
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_portfolioFields
	 */
	sys_updated_on: $$rhino.Nilable<$$property.Element>;
}

declare type pm_portfolioGlideRecord = GlideRecord & pm_portfolioFields;

/**
 * GlideElement values from the Planned Task table.
 * @interface planned_taskFields
 * @extends {ItaskFields}
 */
declare interface planned_taskFields extends taskFields {
	/**
	 * Allow dates outside schedule
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	allow_dates_outside_schedule: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is currency
	 * @summary Planned benefit
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	benefits: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is currency
	 * @summary Budget cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	budget_cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * "automatic"="Automatic"; "manual"="Manual"
	 * @summary Calculation
	 * @type {IStringBasedGlideElement<("automatic" | "manual")>}
	 * @memberof planned_taskFields
	 */
	calculation_type: $$rhino.Nilable<$$property.generic.Element<("automatic" | "manual")>>;

	/**
	 * Internal type is currency
	 * @summary Planned Capital
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	capex_cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is currency
	 * @summary Total Planned cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Critical path
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	critical_path: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is "decoration"
	 * @summary Dependency
	 * @type {GlideElement}
	 * @memberof planned_taskFields
	 */
	dependency: GlideElement;

	/**
	 * Internal type is glide_duration
	 * @summary Planned duration
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	duration: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_duration
	 * @summary Planned effort
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	effort: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_date_time
	 * @summary Planned end date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	end_date: $$rhino.Nilable<$$property.Element>;

	/**
	 * Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 * @summary End date derived from
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	end_date_derived_from: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;

	/**
	 * Internal type is html
	 * @summary HTML description
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	html_description: $$rhino.Nilable<$$property.Element>;

	/**
	 * Key milestone
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	key_milestone: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is integer
	 * @summary Level
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	level: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Milestone
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	milestone: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is integer
	 * @summary MPP task id
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	mpp_task_id: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is currency
	 * @summary Planned Operating
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	opex_cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 * @summary Orig sys ID
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	orig_sys_id: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;

	/**
	 * Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 * @summary Orig top task ID
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	orig_top_task_id: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;

	/**
	 * Internal type is "percent_complete"
	 * @summary Percent complete
	 * @type {GlideElement}
	 * @memberof planned_taskFields
	 */
	percent_complete: GlideElement;

	/**
	 * "waterfall"="Waterfall"; "agile"="Agile"; "test"="Test"
	 * @summary Phase type
	 * @type {IStringBasedGlideElement<("waterfall" | "agile" | "test")>}
	 * @memberof planned_taskFields
	 */
	phase_type: $$rhino.Nilable<$$property.generic.Element<("waterfall" | "agile" | "test")>>;

	/**
	 * Reference to Planned Task Relationship ($$rhino.Nilable<$$property.generic.Reference<Iplanned_task_rel_planned_taskFields, Iplanned_task_rel_planned_taskGlideRecord>>)
	 * @summary Relation applied
	 * @type { $$rhino.Nilable<$$property.Reference>}
	 * @memberof planned_taskFields
	 */
	relation_applied: $$rhino.Nilable<$$property.Reference>;

	/**
	 * Internal type is glide_duration
	 * @summary Remaining duration
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	remaining_duration: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_duration
	 * @summary Remaining effort
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	remaining_effort: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is currency
	 * @summary Resource allocated cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	resource_allocated_cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is currency
	 * @summary Resource planned cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	resource_planned_cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Rollup
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	rollup: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is glide_date_time
	 * @summary Original end date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	schedule_end_date: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_date_time
	 * @summary Original start date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	schedule_start_date: $$rhino.Nilable<$$property.Element>;

	/**
	 * Shadow
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	shadow: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is glide_date_time
	 * @summary Planned start date
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	start_date: $$rhino.Nilable<$$property.Element>;

	/**
	 * Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 * @summary Start date derived from
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	start_date_derived_from: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;

	/**
	 * "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 * @summary Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof planned_taskFields
	 */
	status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;

	/**
	 * Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 * @summary Sub tree root
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	sub_tree_root: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;

	/**
	 * Internal type is "composite_field"
	 * @summary Task
	 * @type {GlideElement}
	 * @memberof planned_taskFields
	 */
	task: GlideElement;

	/**
	 * Generate time cards for top task only
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof planned_taskFields
	 */
	time_card_at_top_task: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * "asap"="Start ASAP"; "start_on"="Start on specific date"
	 * @summary Time constraint
	 * @type {IStringBasedGlideElement<("asap" | "start_on")>}
	 * @memberof planned_taskFields
	 */
	time_constraint: $$rhino.Nilable<$$property.generic.Element<("asap" | "start_on")>>;

	/**
	 * Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 * @summary Top portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	top_portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;

	/**
	 * Reference to Program ($$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>)
	 * @summary Top program
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	top_program: $$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>;

	/**
	 * Reference to Planned Task ($$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>)
	 * @summary Top task
	 * @type {$$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>}
	 * @memberof planned_taskFields
	 */
	top_task: $$rhino.Nilable<$$property.generic.Reference<planned_taskFields, planned_taskGlideRecord>>;

	/**
	 * Internal type is integer
	 * @summary Version
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	version: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * WBS
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	wbs: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is integer
	 * @summary WBS Order
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	wbs_order: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is currency
	 * @summary Actual cost
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof planned_taskFields
	 */
	work_cost: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is glide_duration
	 * @summary Actual duration
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	work_duration: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_duration
	 * @summary Actual effort
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof planned_taskFields
	 */
	work_effort: $$rhino.Nilable<$$property.Element>;
}

declare type planned_taskGlideRecord = taskGlideRecord & planned_taskFields;

/**
 * GlideElement values from the Program table.
 * @interface pm_programFields
 * @extends {planned_taskFields}
 */
declare interface pm_programFields extends planned_taskFields {
	/**
	 * "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 * @summary Cost Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 */
	cost_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;

	/**
	 * Internal type is "glide_list"
	 * @summary Goals
	 * @type {GlideElement}
	 * @memberof pm_programFields
	 */
	goals: GlideElement;

	/**
	 * Internal type is currency
	 * @summary Planned returns
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_programFields
	 */
	planned_return: $$rhino.Nilable<$$property.Currency>;

	/**
	 * Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 * @summary Portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof pm_programFields
	 */
	portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;

	/**
	 * Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 * @summary Program manager
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof pm_programFields
	 */
	program_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

	/**
	 * Internal type is "glide_list"
	 * @summary Project/Demand Portfolios
	 * @type {GlideElement}
	 * @memberof pm_programFields
	 */
	related_portfolios: GlideElement;

	/**
	 * "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 * @summary Resource Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 */
	resource_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;

	/**
	 * "critical"="Critical"; "high"="High"; "moderate"="Moderate"; "low"="Low"; "planning"="Planning"
	 * @summary Risk
	 * @type {IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>}
	 * @memberof pm_programFields
	 */
	risk: $$rhino.Nilable<$$property.generic.Element<("critical" | "high" | "moderate" | "low" | "planning")>>;

	/**
	 * Internal type is decimal
	 * @summary Planned ROI %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 */
	roi: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 * @summary Schedule Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 */
	schedule_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;

	/**
	 * "green"="Green"; "yellow"="Yellow"; "red"="Red"
	 * @summary Scope Status
	 * @type {IStringBasedGlideElement<("green" | "yellow" | "red")>}
	 * @memberof pm_programFields
	 */
	scope_status: $$rhino.Nilable<$$property.generic.Element<("green" | "yellow" | "red")>>;

	/**
	 * Internal type is decimal
	 * @summary Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 */
	score: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is decimal
	 * @summary Risk
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 */
	score_risk: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is decimal
	 * @summary Size
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 */
	score_size: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is decimal
	 * @summary Value
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_programFields
	 */
	score_value: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is "glide_list"
	 * @summary Strategies
	 * @type {GlideElement}
	 * @memberof pm_programFields
	 */
	strategic_objectives: GlideElement;
}

declare type pm_programGlideRecord = planned_taskGlideRecord & pm_programFields;

/**
 * GlideElement values from the Goal table.
 * @interface goalFields
 */
declare interface goalFields extends IGlideTableProperties {
	/**
	 * Active
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof goalFields
	 */
	active: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is float
	 * @summary Actual achievement till date
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 */
	actual_achievement_till_date: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Comments
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	comments: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is choice; "increase"="Maximize"; "decrease"="Minimize"
	 * @summary Direction
	 * @type {IStringBasedGlideElement<("increase" | "decrease")>}
	 * @memberof goalFields
	 */
	direction: $$rhino.Nilable<$$property.generic.Element<("increase" | "decrease")>>;

	/**
	 * Internal type is float
	 * @summary Planned achievement
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 */
	estimated_achievement: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Goal Indicator
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	goal_indicator: $$rhino.Nilable<$$property.Element>;

	/**
	 * Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 * @summary Owner
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof goalFields
	 */
	goal_owner: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

	/**
	 * Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 * @summary Portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof goalFields
	 */
	portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;

	/**
	 * Short description
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	short_description: $$rhino.Nilable<$$property.Element>;

	/**
	 * "pending"="Pending"; "achieved"="Achieved"; "not_achieved"="Not Achieved"
	 * @summary State
	 * @type {IStringBasedGlideElement<("pending" | "achieved" | "not_achieved")>}
	 * @memberof goalFields
	 */
	state: $$rhino.Nilable<$$property.generic.Element<("pending" | "achieved" | "not_achieved")>>;

	/**
	 * Internal type is choice; "red"="Red"; "yellow"="Yellow"; "green"="Green"
	 * @summary Status indicator
	 * @type {IStringBasedGlideElement<("red" | "yellow" | "green")>}
	 * @memberof goalFields
	 */
	status_indicator: $$rhino.Nilable<$$property.generic.Element<("red" | "yellow" | "green")>>;

	/**
	 * Created by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	sys_created_by: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_date_time
	 * @summary Created
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	sys_created_on: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is "domain_id"
	 * @summary Domain
	 * @type {GlideElement}
	 * @memberof goalFields
	 */
	sys_domain: GlideElement;

	/**
	 * Internal type is "domain_path"
	 * @summary Domain Path
	 * @type {GlideElement}
	 * @memberof goalFields
	 */
	sys_domain_path: GlideElement;

	/**
	 * Internal type is integer
	 * @summary Updates
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 */
	sys_mod_count: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Updated by
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	sys_updated_by: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is glide_date_time
	 * @summary Updated
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof goalFields
	 */
	sys_updated_on: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is float
	 * @summary Target
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof goalFields
	 */
	target_value: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Reference to Task ($$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>)
	 * @summary Task
	 * @type {$$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>}
	 * @memberof goalFields
	 */
	task: $$rhino.Nilable<$$property.generic.Reference<taskFields, taskGlideRecord>>;

	/**
	 * Reference to Unit (IGlideRefElement<Ipa_unitsGlideRecord>)
	 * @summary Unit
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof goalFields
	 */
	unit: $$rhino.Nilable<$$property.Reference>;
}

declare type goalGlideRecord = GlideRecord & goalFields;

/**
 * GlideElement values from the Project Task table.
 * @interface pm_project_taskFields
 * @extends {planned_taskFields}
 */
declare interface pm_project_taskFields extends planned_taskFields {
	/**
	 * Rollup dates from stories
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_project_taskFields
	 */
	agile_rollup_dates: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Reference to Sprint (IGlideRefElement<Irm_sprintGlideRecord>)
	 * @summary End Sprint
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 */
	end_sprint: $$rhino.Nilable<$$property.Reference>;

	/**
	 * Link
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_project_taskFields
	 */
	link: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Internal type is "composite_field"
	 * @summary Project
	 * @type {GlideElement}
	 * @memberof pm_project_taskFields
	 */
	project: GlideElement;

	/**
	 * Reference to Team (IGlideRefElement<Iscrum_pp_teamGlideRecord>)
	 * @summary Team
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 */
	scrum_team: $$rhino.Nilable<$$property.Reference>;

	/**
	 * Reference to Sprint (IGlideRefElement<Irm_sprintGlideRecord>)
	 * @summary Start Sprint
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 */
	start_sprint: $$rhino.Nilable<$$property.Reference>;

	/**
	 * Reference to Test Plan (IGlideRefElement<Itm_test_planGlideRecord>)
	 * @summary Test plan
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_project_taskFields
	 */
	test_plan: $$rhino.Nilable<$$property.Reference>;
}

declare type pm_project_taskGlideRecord = planned_taskGlideRecord & pm_project_taskFields;

/**
 * GlideElement values from the Project table.
 * @interface pm_projectFields
 * @extends {planned_taskFields}
 */
declare interface pm_projectFields extends planned_taskFields {
	/**
	 * Internal type is html
	 * @summary Assumptions
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	assumptions: $$rhino.Nilable<$$property.Element>;

	/**
	 * Reference to Personal backlog (IGlideRefElement<Ibacklog_definitionGlideRecord>)
	 * @summary Backlog
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_projectFields
	 */
	backlog_definition: $$rhino.Nilable<$$property.Reference>;

	/**
	 * Internal type is html
	 * @summary Barriers
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	barriers: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is "glide_list"
	 * @summary Business Applications
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 */
	business_applications: GlideElement;

	/**
	 * Internal type is "glide_list"
	 * @summary Business Capabilities
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 */
	business_capabilities: GlideElement;

	/**
	 * Internal type is html
	 * @summary Business case
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	business_case: $$rhino.Nilable<$$property.Element>;

	/**
	 * Reference to Business Unit ($$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>)
	 * @summary Business Unit
	 * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

	/**
	 * Internal type is currency
	 * @summary Operating Estimate at completion
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 */
	capex_forecast_cost: $$rhino.Nilable<$$property.Currency>;

	/**
	 * Reference to Demand (IGlideRefElement<Idmn_demandGlideRecord>)
	 * @summary Demand
	 * @type {$$rhino.Nilable<$$property.Reference>}
	 * @memberof pm_projectFields
	 */
	demand: $$rhino.Nilable<$$property.Reference>;

	/**
	 * Reference to Department ($$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>)
	 * @summary Department
	 * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

	/**
	 * Internal type is decimal
	 * @summary Discount Rate %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	discount_rate: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is html
	 * @summary Enablers
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	enablers: $$rhino.Nilable<$$property.Element>;

	/**
	 * "waterfall"="Waterfall"; "agile"="Agile"; "hybrid"="Hybrid"
	 * @summary Execution type
	 * @type {IStringBasedGlideElement<("waterfall" | "agile" | "hybrid")>}
	 * @memberof pm_projectFields
	 */
	execution_type: $$rhino.Nilable<$$property.generic.Element<("waterfall" | "agile" | "hybrid")>>;

	/**
	 * Internal type is currency
	 * @summary Estimate at completion
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 */
	forecast_cost: $$rhino.Nilable<$$property.Currency>;

	/**
	 * Reference to Goal ($$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>)
	 * @summary Goal
	 * @type {$$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	goal: $$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>;

	/**
	 * Internal type is "glide_list"
	 * @summary Goals
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 */
	goals: GlideElement;

	/**
	 * Internal type is "glide_list"
	 * @summary Impacted Business Units
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 */
	impacted_business_units: GlideElement;

	/**
	 * "run"="Run"; "change"="Change"
	 * @summary Investment Class
	 * @type {IStringBasedGlideElement<("run" | "change")>}
	 * @memberof pm_projectFields
	 */
	investment_class: $$rhino.Nilable<$$property.generic.Element<("run" | "change")>>;

	/**
	 * "cost_reduction"="Cost Reduction"; "end_user_experience"="End User Experience"; "legal_and_regulatory"="Legal and Regulatory"; "revenue_generating"="Revenue Generating";
	 * 		"service_sustaining"="Service Sustaining"; "strategic_enabler"="Strategic Enabler"
	 * @summary Investment Type
	 * @type {IStringBasedGlideElement<("cost_reduction" | "end_user_experience" | "legal_and_regulatory" | "revenue_generating" | "service_sustaining" | "strategic_enabler")>}
	 * @memberof pm_projectFields
	 */
	investment_type: $$rhino.Nilable<$$property.generic.Element<("cost_reduction" | "end_user_experience" | "legal_and_regulatory" | "revenue_generating" | "service_sustaining" | "strategic_enabler")>>;

	/**
	 * Internal type is html
	 * @summary In scope
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	in_scope: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is decimal
	 * @summary Internal rate of return %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	irr_value: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is currency
	 * @summary Net present value
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 */
	npv_value: $$rhino.Nilable<$$property.Currency>;

	/**
	 * Internal type is currency
	 * @summary Capital Estimate at completion
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 */
	opex_forecast_cost: $$rhino.Nilable<$$property.Currency>;

	/**
	 * Internal type is html
	 * @summary Out of scope
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	out_of_scope: $$rhino.Nilable<$$property.Element>;

	/**
	 * "initiating"="Initiating"; "planning"="Planning"; "executing"="Executing"; "delivering"="Delivering"; "closing"="Closing"
	 * @summary Phase
	 * @type {IStringBasedGlideElement<("initiating" | "planning" | "executing" | "delivering" | "closing")>}
	 * @memberof pm_projectFields
	 */
	phase: $$rhino.Nilable<$$property.generic.Element<("initiating" | "planning" | "executing" | "delivering" | "closing")>>;

	/**
	 * Reference to Portfolio ($$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>)
	 * @summary Portfolio
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	primary_portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;

	/**
	 * Reference to Program ($$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>)
	 * @summary Program
	 * @type {$$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	primary_program: $$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>;

	/**
	 * Reference to User ($$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>)
	 * @summary Project manager
	 * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	project_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

	/**
	 * "date_time"="Date and Time"; "date"="Date"
	 * @summary Project schedule date format
	 * @type {IStringBasedGlideElement<("date_time" | "date")>}
	 * @memberof pm_projectFields
	 */
	project_schedule_date_format: $$rhino.Nilable<$$property.generic.Element<("date_time" | "date")>>;

	/**
	 * "regular"="Regular"; "workbench"="Workbench"
	 * @summary Project type
	 * @type {IStringBasedGlideElement<("regular" | "workbench")>}
	 * @memberof pm_projectFields
	 */
	project_type: $$rhino.Nilable<$$property.generic.Element<("regular" | "workbench")>>;

	/**
	 * Derive assignee list from resource plan
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_projectFields
	 */
	resources_from_resource_plan: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * "critical"="Critical"; "high"="High"; "moderate"="Moderate"; "low"="Low"; "planning"="Planning"
	 * @summary Risk
	 * @type {IStringBasedGlideElement<("critical" | "high" | "moderate" | "low" | "planning")>}
	 * @memberof pm_projectFields
	 */
	risk: $$rhino.Nilable<$$property.generic.Element<("critical" | "high" | "moderate" | "low" | "planning")>>;

	/**
	 * Internal type is currency
	 * @summary Risk cost
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 */
	risk_cost: $$rhino.Nilable<$$property.Currency>;

	/**
	 * Internal type is html
	 * @summary Risk of not performing
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	risk_of_not_performing: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is html
	 * @summary Risk of performing
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	risk_of_performing: $$rhino.Nilable<$$property.Element>;

	/**
	 * Internal type is decimal
	 * @summary Planned ROI %
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	roi: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Reference to Schedule ($$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>)
	 * @summary Schedule
	 * @type {$$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>}
	 * @memberof pm_projectFields
	 */
	schedule: $$rhino.Nilable<$$property.generic.Reference<cmn_scheduleFields, cmn_scheduleGlideRecord>>;

	/**
	 * Internal type is decimal
	 * @summary Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	score: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is decimal
	 * @summary Risk Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	score_risk: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is decimal
	 * @summary Size Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	score_size: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is decimal
	 * @summary Value Score
	 * @type {$$rhino.Nilable<$$property.Numeric>}
	 * @memberof pm_projectFields
	 */
	score_value: $$rhino.Nilable<$$property.Numeric>;

	/**
	 * Internal type is "glide_list"
	 * @summary Strategies
	 * @type {GlideElement}
	 * @memberof pm_projectFields
	 */
	strategic_objectives: GlideElement;

	/**
	 * "project"="Project only"; "project_task"="Project tasks only"; "project_project_task"="Project and project tasks"; "no_time_card"="No time reporting"
	 * @summary Allow time card reporting on
	 * @type {IStringBasedGlideElement<("project" | "project_task" | "project_project_task" | "no_time_card")>}
	 * @memberof pm_projectFields
	 */
	time_card_preference: $$rhino.Nilable<$$property.generic.Element<("project" | "project_task" | "project_project_task" | "no_time_card")>>;

	/**
	 * Derive time component from planned dates
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof pm_projectFields
	 */
	time_component_from_planned: $$rhino.Nilable<$$property.Boolean>;

	/**
	 * Title
	 * @type {$$rhino.Nilable<$$property.Element>}
	 * @memberof pm_projectFields
	 */
	title: $$rhino.Nilable<$$property.Element>;

	/**
	 * "yes"="Yes"; "no"="No"
	 * @summary Update actual effort from time card
	 * @type {IStringBasedGlideElement<("yes" | "no")>}
	 * @memberof pm_projectFields
	 */
	update_actual_effort_from_time_card: $$rhino.Nilable<$$property.generic.Element<("yes" | "no")>>;

	/**
	 * "yes"="Yes"; "no"="No"
	 * @summary Recalculate score on project change
	 * @type {IStringBasedGlideElement<("yes" | "no")>}
	 * @memberof pm_projectFields
	 */
	update_score_on_value_change: $$rhino.Nilable<$$property.generic.Element<("yes" | "no")>>;

	/**
	 * Internal type is currency
	 * @summary Planned return
	 * @type {$$rhino.Nilable<$$property.Currency>}
	 * @memberof pm_projectFields
	 */
	value: $$rhino.Nilable<$$property.Currency>;
}

declare type pm_projectGlideRecord = planned_taskGlideRecord & pm_projectFields;

/**
 * strategic=Strategic; operational=Operational
 */
declare type DemandCategory = "strategic" | "operational";

/**
 * critical=Critical; high=High; moderate=Moderate; low=Low; planning=Planning
 */
declare type DemandRiskLevel = "critical" | "high" | "moderate" | "low" | "planning";

/**
 * change=Change (dependent: operational); enhancement=Enhancement (dependent: strategic); defect=Defect (depedent: operational); project=Project (dependent: strategic)
 */
declare type DemandType = "change" | "enhancement" | "defect" | "project";

/**
 * GlideElement values from the Idea table.
 * @interface dmn_demandFields
 * @extends {taskFields}
*/
declare interface dmn_demandFields extends taskFields {
	/**
	 * Assessment Required
	 * @type {$$rhino.Nilable<$$property.Boolean>}
	 * @memberof dmn_demandFields
	 */
	assessment_required: $$rhino.Nilable<$$property.Boolean>;

    /**
     * Assumptions field. Internal type is "html".
     * @summary Assumptions.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	assumptions: $$rhino.Nilable<$$property.Element>;

    /**
     * Barriers field. Internal type is "html".
     * @summary Barriers.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	barriers: $$rhino.Nilable<$$property.Element>;

    /**
     * Business Applications field. Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_appFields, cmdb_ci_business_appGlideRecord>.
     * @summary Business Applications.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	business_applications: $$rhino.Nilable<IGlideElement>;

    /**
     * Business Capabilities field. Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_capabilityFields, cmdb_ci_business_capabilityGlideRecord>.
     * @summary Business Capabilities.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	business_capabilities: $$rhino.Nilable<IGlideElement>;

    /**
     * Business case field. Internal type is "html".
     * @summary Business case.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	business_case: $$rhino.Nilable<$$property.Element>;

    /**
     * Business Unit
     * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
     */
	business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

    /**
     * Capital budget
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	capital_budget: $$rhino.Nilable<$$property.Currency>;

    /**
     * Capital expense
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	capital_outlay: $$rhino.Nilable<$$property.Currency>;

    /**
     * Category
     * @type {$$rhino.Nilable<$$property.generic.Element<DemandCategory>>}
     */
	category: $$rhino.Nilable<$$property.generic.Element<DemandCategory>>;

    /**
     * Change
     * @type {$$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>}
     */
	change: $$rhino.Nilable<$$property.generic.Reference<change_requestFields, change_requestGlideRecord>>;

    /**
     * Collaborators field. Internal type is "glide_list"; refers to $$property.generic.Reference<sys_userFields, sys_userGlideRecord>.
     * @summary Collaborators.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	collaborators: $$rhino.Nilable<IGlideElement>;

    /**
     * Cost field. Internal type is "decimal".
     * @summary Cost.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	score_cost: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Defect field. Refers to Defect $$property.generic.Reference<rm_defectFields, rm_defectGlideRecord>.
     * @summary Defect.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	defect: $$rhino.Nilable<IGlideElement>;

    /**
     * Demand field. Internal type is "composite_field";.
     * @summary Demand.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	demand: $$rhino.Nilable<$$property.Element>;

    /**
     * Demand manager
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
	demand_manager: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Department
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
	department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Discount Rate % field. Internal type is "decimal".
     * @summary Discount Rate %.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	discount_rate: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Due date field. Internal type is "glide_date".
     * @summary Due date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
	requested_by: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Enablers field. Internal type is "html".
     * @summary Enablers.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	enablers: $$rhino.Nilable<$$property.Element>;

    /**
     * Enhancement field. Refers to Enhancement $$property.generic.Reference<rm_enhancementFields, rm_enhancementGlideRecord>.
     * @summary Enhancement.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	enhancement: $$rhino.Nilable<IGlideElement>;

    /**
     * Financial benefit
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	financial_benefit: $$rhino.Nilable<$$property.Currency>;

    /**
     * Financial return
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	financial_return: $$rhino.Nilable<$$property.Currency>;

    /**
     * Goal
     * @type {$$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>}
     */
	goal: $$rhino.Nilable<$$property.generic.Reference<goalFields, goalGlideRecord>>;

    /**
     * Goals field. Internal type is "glide_list"; refers to $$property.generic.Reference<goalFields, goalGlideRecord>.
     * @summary Goals.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	goals: $$rhino.Nilable<IGlideElement>;

    /**
     * Idea
     * @type {$$rhino.Nilable<$$property.generic.Reference<ideaFields, ideaGlideRecord>>}
     */
	idea: $$rhino.Nilable<$$property.generic.Reference<ideaFields, ideaGlideRecord>>;

    /**
     * Impacted Business Units field. Internal type is "glide_list"; refers to $$property.generic.Reference<business_unitFields, business_unitGlideRecord>.
     * @summary Impacted Business Units.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	impacted_business_units: $$rhino.Nilable<IGlideElement>;

    /**
     * In scope field. Internal type is "html".
     * @summary In scope.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	in_scope: $$rhino.Nilable<$$property.Element>;

    /**
     * Internal rate of return % field. Internal type is "decimal".
     * @summary Internal rate of return %.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	irr_value: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Investment Class field. Choice from investment_class field in pm_project table;.
     * @summary Investment Class.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	investment_class: $$rhino.Nilable<$$property.Element>;

    /**
     * Investment Type field. Choice from investment_type field in pm_project table;.
     * @summary Investment Type.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	investment_type: $$rhino.Nilable<$$property.Element>;

    /**
     * Labor costs
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	labor_costs: $$rhino.Nilable<$$property.Currency>;

    /**
     * Net present value
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	npv_value: $$rhino.Nilable<$$property.Currency>;

    /**
     * Operating budget
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	operational_budget: $$rhino.Nilable<$$property.Currency>;

    /**
     * Operating expense
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	operational_outlay: $$rhino.Nilable<$$property.Currency>;

    /**
     * Other costs
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	other_costs: $$rhino.Nilable<$$property.Currency>;

    /**
     * Out of scope field. Internal type is "html".
     * @summary Out of scope.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	out_of_scope: $$rhino.Nilable<$$property.Element>;

    /**
     * Portfolio
     * @type {$$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>}
     */
	portfolio: $$rhino.Nilable<$$property.generic.Reference<pm_portfolioFields, pm_portfolioGlideRecord>>;

    /**
     * Program
     * @type {$$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>}
     */
	primary_program: $$rhino.Nilable<$$property.generic.Reference<pm_programFields, pm_programGlideRecord>>;

    /**
     * Project
     * @type {$$rhino.Nilable<$$property.generic.Reference<pm_projectFields, pm_projectGlideRecord>>}
     */
	project: $$rhino.Nilable<$$property.generic.Reference<pm_projectFields, pm_projectGlideRecord>>;

    /**
     * Related Records field. Internal type is "glide_list"; refers to $$property.generic.Reference<taskFields, taskGlideRecord>.
     * @summary Related Records.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	related_records: $$rhino.Nilable<IGlideElement>;

    /**
     * Resource allocated cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	resource_allocated_cost: $$rhino.Nilable<$$property.Currency>;

    /**
     * Resource planned cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	resource_planned_cost: $$rhino.Nilable<$$property.Currency>;

    /**
     * Risk field. Internal type is "decimal".
     * @summary Risk.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	score_risk: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Risk Level
     * @type {$$rhino.Nilable<$$property.generic.Element<DemandRiskLevel>>}
     */
	expected_risk: $$rhino.Nilable<$$property.generic.Element<DemandRiskLevel>>;

    /**
     * Risk of not performing field. Internal type is "html".
     * @summary Risk of not performing.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	risk_of_not_performing: $$rhino.Nilable<$$property.Element>;

    /**
     * Risk of performing field. Internal type is "html".
     * @summary Risk of performing.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	risk_of_performing: $$rhino.Nilable<$$property.Element>;

    /**
     * ROI % field. Internal type is "decimal".
     * @summary ROI %.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	expected_roi: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Score field. Internal type is "decimal".
     * @summary Score.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	score: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Size field. Internal type is "decimal".
     * @summary Size.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	score_size: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Stage field. Internal type is "decoration";.
     * @summary Stage.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	stage: $$rhino.Nilable<IGlideElement>;

    /**
     * Start date field. Internal type is "glide_date".
     * @summary Start date.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
	start_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * Strategic Alignment field. Internal type is "decimal".
     * @summary Strategic Alignment.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	score_strategic_allignment: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Strategies field. Internal type is "glide_list"; refers to Strategic Objective $$property.generic.Reference<strategic_objectiveFields, strategic_objectiveGlideRecord>.
     * @summary Strategies.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	strategic_objectives: $$rhino.Nilable<IGlideElement>;

    /**
     * Submitted by
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
	submitter: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

    /**
     * Submitted on field. Internal type is "glide_date".
     * @summary Submitted on.
     * @type {$$rhino.Nilable<$$property.GlideObject>}
     */
	submitted_date: $$rhino.Nilable<$$property.GlideObject>;

    /**
     * T-Shirt size field ("small"="S - Small"; "medium"="M - Medium"; "large"="L - Large"; "xlarge"="XL - Extra Large"; "xxlarge"="XXL - Extra Extra Large").
     * @summary T-Shirt size.
     * @type {$$rhino.Nilable<$$property.generic.Element<"small" | "medium" | "large" | "xlarge" | "xxlarge">>}
     */
	size: $$rhino.Nilable<$$property.generic.Element<"small" | "medium" | "large" | "xlarge" | "xxlarge">>;

    /**
     * Total planned cost
     * @type {$$rhino.Nilable<$$property.Currency>}
     */
	total_costs: $$rhino.Nilable<$$property.Currency>;

    /**
     * Type
     * @type {$$rhino.Nilable<$$property.generic.Element<DemandType>>}
     */
	type: $$rhino.Nilable<$$property.generic.Element<DemandType>>;

    /**
     * Value field. Internal type is "decimal".
     * @summary Value.
     * @type {$$rhino.Nilable<$$property.Numeric>}
     */
	score_value: $$rhino.Nilable<$$property.Numeric>;

    /**
     * Visited States
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	visited_state: $$rhino.Nilable<$$property.Element>;

}

declare type dmn_demandGlideRecord = taskGlideRecord & dmn_demandFields;

/**
 * GlideElement values from the Idea table.
 * @interface ideaFields
 * @extends {taskFields}
*/
declare interface ideaFields extends taskFields {
    /**
     * Business Applications field. Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_appFields, cmdb_ci_business_appGlideRecord>.
     * @summary Business Applications.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	business_applications: $$rhino.Nilable<IGlideElement>;

    /**
     * Business Capabilities field. Internal type is "glide_list"; refers to $$property.generic.Reference<cmdb_ci_business_capabilityFields, cmdb_ci_business_capabilityGlideRecord>.
     * @summary Business Capabilities.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	business_capabilities: $$rhino.Nilable<IGlideElement>;

    /**
     * Business Unit
     * @type {$$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>}
     */
	business_unit: $$rhino.Nilable<$$property.generic.Reference<business_unitFields, business_unitGlideRecord>>;

    /**
     * Collaborators field. Internal type is "glide_list"; refers to $$property.generic.Reference<sys_userFields, sys_userGlideRecord>.
     * @summary Collaborators.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	collaborators: $$rhino.Nilable<IGlideElement>;

    /**
     * Demand
     * @type {$$rhino.Nilable<$$property.generic.Reference<dmn_demandFields, dmn_demandGlideRecord>>}
     */
	demand: $$rhino.Nilable<$$property.generic.Reference<dmn_demandFields, dmn_demandGlideRecord>>;

    /**
     * Demand field. Internal type is "composite_field";.
     * @summary Demand.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	demand_composite: $$rhino.Nilable<$$property.Element>;

    /**
     * Department
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
	department: $$rhino.Nilable<$$property.generic.Reference<cmn_departmentFields, cmn_departmentGlideRecord>>;

    /**
     * Description field. Internal type is "html".
     * @summary Description.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	business_case: $$rhino.Nilable<$$property.Element>;

    /**
     * Idea field. Internal type is "composite_field";.
     * @summary Idea.
     * @type {$$rhino.Nilable<$$property.Element>}
     */
	idea: $$rhino.Nilable<$$property.Element>;

    /**
     * Impacted Business Units field. Internal type is "glide_list"; refers to $$property.generic.Reference<business_unitFields, business_unitGlideRecord>.
     * @summary Impacted Business Units.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	impacted_business_units: $$rhino.Nilable<IGlideElement>;

    /**
     * Stage field. Internal type is "decoration";.
     * @summary Stage.
     * @type {$$rhino.Nilable<IGlideElement>}
     */
	stage: $$rhino.Nilable<IGlideElement>;

    /**
     * Submitted by
     * @type {$$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>}
     */
	submitter: $$rhino.Nilable<$$property.generic.Reference<sys_userFields, sys_userGlideRecord>>;

}

declare type ideaGlideRecord = taskGlideRecord & ideaFields;