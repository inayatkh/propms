// Copyright (c) 2018, Aakvatech and contributors
// For license information, please see license.txt

frappe.ui.form.on('Property', {
	refresh: function(frm) {

	},
	setup: function(frm) {
		frm.set_query("cost_center", function() {
			return {
				"filters": {
                    "company": frm.doc.company,
				},
			};
		});

		frm.set_query("parent_property", {is_group: 1});
	},
	company: function(frm) {
		frm.set_value("cost_center", "");
	},
});

frappe.ui.form.on('Property Meter Reading', {
    meter_number: function(frm,cdt,cdn) {
		var property_doc = locals[cur_frm.doc.doctype][cur_frm.doc.name];
		var meter_doc = locals[cdt][cdn];
		if (meter_doc.meter_number != "") {
			$.each(property_doc.property_meter_reading, function(i, d) {
				if(d.name!=meter_doc.name && meter_doc.meter_type==d.meter_type && d.status=="Active")	{
					var msg="Another Active Meter of type "+meter_doc.meter_type+" Is Already allocated. Please de-activate it before adding a new meter of same type."
					frappe.model.set_value(cdt,cdn,"meter_number",'')
					frappe.throw(msg)
				}
			})
		}
	},
	status: function(frm,cdt,cdn) {
		var property_doc = locals[cur_frm.doc.doctype][cur_frm.doc.name];
		var meter_doc = locals[cdt][cdn];
		if (meter_doc.meter_number != "") {
			$.each(property_doc.property_meter_reading, function(i, d) {
				if(d.name!=meter_doc.name && meter_doc.meter_type==d.meter_type && d.status=="Active")	{
					var msg="Another Active Meter of type "+meter_doc.meter_type+" Is Already allocated. Please de-activate it before adding a new meter of same type."
					frappe.model.set_value(cdt,cdn,"status",'')
					frappe.throw(msg)
				}
			})
		}
	}
})

