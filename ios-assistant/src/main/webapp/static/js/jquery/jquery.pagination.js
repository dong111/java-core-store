/**
 * This jQuery plugin displays pagination links inside the selected elements.
 * 
 * This plugin needs at least jQuery 1.4.2
 * 
 * @author Gabriel Birke (birke *at* d-scribe *dot* de)
 * @version 2.2
 * @param {int}
 *            maxentries Number of entries to paginate
 * @param {Object}
 *            opts Several options (see README for documentation)
 * @return {Object} jQuery Object
 */
(function($) {
	/**
	 * @class Class for calculating pagination values
	 */
	$.PaginationCalculator = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
	}

	$.extend($.PaginationCalculator.prototype, {
		/**
		 * Calculate the maximum number of pages
		 * 
		 * @method
		 * @returns {Number}
		 */
		numPages : function() {
			return Math.ceil(this.maxentries / this.opts.items_per_page);
		},
		/**
		 * Calculate start and end point of pagination links depending on
		 * current_page and num_display_entries.
		 * 
		 * @returns {Array}
		 */
		getInterval : function(current_page) {
			var ne_half = Math.floor(this.opts.num_display_entries / 2);
			var np = this.numPages();
			var upper_limit = np - this.opts.num_display_entries;
			var start = current_page > ne_half ? Math.max(Math.min(current_page
					- ne_half, upper_limit), 0) : 0;
			var end = current_page > ne_half ? Math.min(current_page + ne_half
					+ (this.opts.num_display_entries % 2), np) : Math.min(
					this.opts.num_display_entries, np);
			return {
				start : start,
				end : end
			};
		}
	});

	// Initialize jQuery object container for pagination renderers
	$.PaginationRenderers = {}

	/**
	 * @class Default renderer for rendering pagination links
	 */
	$.PaginationRenderers.defaultRenderer = function(maxentries, opts) {
		this.maxentries = maxentries;
		this.opts = opts;
		this.pc = new $.PaginationCalculator(maxentries, opts);
	}
	$
			.extend(
					$.PaginationRenderers.defaultRenderer.prototype,
					{
						/**
						 * Helper function for generating a single link (or a
						 * span tag if it's the current page)
						 * 
						 * @param {Number}
						 *            page_id The page id for the new item
						 * @param {Number}
						 *            current_page
						 * @param {Object}
						 *            appendopts Options for the new item: text
						 *            and classes
						 * @returns {jQuery} jQuery object containing the link
						 */
						createLink : function(page_id, current_page, appendopts) {
							var lnk, np = this.pc.numPages();
							page_id = page_id < 0 ? 0 : (page_id < np ? page_id
									: np - 1); // Normalize page id to sane
							// value
							appendopts = $.extend( {
								text : page_id + 1,
								classes : "current"
							}, appendopts || {});
							if (page_id == current_page) {
								lnk = $("<span>" + appendopts.text + "</span>");
							} else {
								lnk = $("<a>" + appendopts.text + "</a>").attr(
										'href',
										this.opts.link_to.replace(/__id__/,
												page_id));
							}
							if (appendopts.classes) {
								lnk.addClass(appendopts.classes);
							}
							lnk.data('page_id', page_id);
							return lnk;
						},
						// Generate a range of numeric links
						appendRange : function(container, current_page, start,
								end, opts) {
							var i;
							for (i = start; i < end; i++) {
								this.createLink(i, current_page, opts)
										.appendTo(container);
							}
						},
						getLinks : function(current_page, eventHandler) {
							var obj = this.opts;
							var begin, end, interval = this.pc
									.getInterval(current_page), np = this.pc
									.numPages(), fragment = $("<div class='scott'></div>");
							// Generate "Previous"-Link
							if (this.opts.prev_text
									&& (current_page > 0 || this.opts.prev_show_always)) {
								fragment.append(this.createLink(
										current_page - 1, current_page, {
											text : this.opts.prev_text,
											classes : "disabled"
										}));
							}
							// Generate starting points
							if (interval.start > 0
									&& this.opts.num_edge_entries > 0) {
								end = Math.min(this.opts.num_edge_entries,
										interval.start);
								this.appendRange(fragment, current_page, 0,
										end, {
											classes : 'sp'
										});
								if (this.opts.num_edge_entries < interval.start
										&& this.opts.ellipse_text) {
									jQuery(
											"<a>" + this.opts.ellipse_text
													+ "</a>")
											.appendTo(fragment);
								}
							}
							// Generate interval links
							this.appendRange(fragment, current_page,
									interval.start, interval.end);
							// Generate ending points
							if (interval.end < np
									&& this.opts.num_edge_entries > 0) {
								if (np - this.opts.num_edge_entries > interval.end
										&& this.opts.ellipse_text) {
									jQuery(
											"<a>" + this.opts.ellipse_text
													+ "</a>")
											.appendTo(fragment);
								}
								begin = Math.max(np
										- this.opts.num_edge_entries,
										interval.end);
								this.appendRange(fragment, current_page, begin,
										np, {
											classes : 'ep'
										});

							}
							// Generate "Next"-Link
							if (this.opts.next_text
									&& (current_page < np - 1 || this.opts.next_show_always)) {
								fragment.append(this.createLink(
										current_page + 1, current_page, {
											text : this.opts.next_text,
											classes : "disabled"
										}));
							}
							$('a', fragment).click(eventHandler);
							fragment
									.prepend("<span style='line-height:22px;'>共"
											+ this.opts.total_page
											+ "页&nbsp;&nbsp;&nbsp;</span>&nbsp;每页显示:<select id='"+obj.global_select_id+"'><option value='10'>10</option><option value='20'>20</option><option value='50'>50</option></select>&nbsp;&nbsp;");
							fragment
									.append("<span>&nbsp;&nbsp;&nbsp;转到第&nbsp;<input type='text' size='3' />&nbsp;页&nbsp;&nbsp;<input type='button' class='btn_gray_small' tagName='btn' value='跳转'></span>");

							$("input:text", fragment).keypress(function(event) {
								if (event.keyCode == 13) {
									eventHandler(event);
								}
							});
							var option = 'option[value=' +obj.global_variable_size + ']';
							$("#" + obj.global_select_id, fragment).find(option)
									.attr("selected", true);
							$("#" + obj.global_select_id, fragment).change(
									function() {
										obj.callback(null, null);
									});

							$("input:button", fragment).click(eventHandler);

							return fragment;
						}
					});

	// Extend jQuery
	$.fn.pagination = function(maxentries, opts) {

		// Initialize options with default values
		opts = jQuery.extend( {
			items_per_page : 10,
			num_display_entries : 11,
			current_page : 0,
			num_edge_entries : 0,
			link_to : "#",
			prev_text : "上一页",
			next_text : "下一页",
			ellipse_text : "...",
			prev_show_always : true,
			next_show_always : true,
			renderer : "defaultRenderer",
			load_first_page : false,
			total_page : 0,
			callback : function() {
				return false;
			},
			global_variable_size : 0,
			global_select_id : ""
		}, opts || {});

		var containers = this, renderer, links, current_page;

		/**
		 * This is the event handling function for the pagination links.
		 * 
		 * @param {int}
		 *            page_id The new page number
		 */
		function paginationClickHandler(evt) {
			var tagName = $(evt.target).attr("tagName");
			var turn2page = null;
			if (tagName && tagName.toUpperCase() !== "A") {
				var regex = /[\d]+/;
				turn2page = $("input:text", $(evt.target).parent()).val();
				var pc = new $.PaginationCalculator(maxentries, opts);
				var np = pc.numPages();
				var start = 1, end = np;
				if (!regex.test(new String(turn2page))) {
					wx_alert("请输入" + start + "到" + end + "的整数！");
					return false;
				}
				if (turn2page < start || turn2page > end) {
					wx_alert("请输入" + start + "到" + end + "的整数！");
					return false;
				}
				$(evt.target).data("page_id", turn2page - 1);
			}
			var links, new_current_page = $(evt.target).data('page_id'), continuePropagation = selectPage(new_current_page);
			if (!continuePropagation) {
				evt.stopPropagation();
			}
			return continuePropagation;
		}

		/**
		 * This is a utility function for the internal event handlers. It sets
		 * the new current page on the pagination container objects, generates a
		 * new HTMl fragment for the pagination links and calls the callback
		 * function.
		 */
		function selectPage(new_current_page) {
			// update the link display of a all containers
			containers.data('current_page', new_current_page);
			links = renderer.getLinks(new_current_page, paginationClickHandler);
			containers.empty();
			links.appendTo(containers);
			// call the callback and propagate the event if it does not return
			// false
			var continuePropagation = opts.callback(new_current_page,
					containers);
			return continuePropagation;
		}

		// -----------------------------------
		// Initialize containers
		// -----------------------------------
		current_page = opts.current_page;
		containers.data('current_page', current_page);
		// Create a sane value for maxentries and items_per_page
		maxentries = (!maxentries || maxentries < 0) ? 1 : maxentries;
		opts.items_per_page = (!opts.items_per_page || opts.items_per_page < 0) ? 1
				: opts.items_per_page;

		if (!$.PaginationRenderers[opts.renderer]) {
			throw new ReferenceError("Pagination renderer '" + opts.renderer
					+ "' was not found in jQuery.PaginationRenderers object.");
		}
		renderer = new $.PaginationRenderers[opts.renderer](maxentries, opts);

		// Attach control events to the DOM elements
		var pc = new $.PaginationCalculator(maxentries, opts);
		var np = pc.numPages();
		containers.bind('setPage', {
			numPages : np
		}, function(evt, page_id) {
			if (page_id >= 0 && page_id < evt.data.numPages) {
				selectPage(page_id);
				return false;
			}
		});
		containers.bind('prevPage', function(evt) {
			var current_page = $(this).data('current_page');
			if (current_page > 0) {
				selectPage(current_page - 1);
			}
			return false;
		});
		containers.bind('nextPage', {
			numPages : np
		}, function(evt) {
			var current_page = $(this).data('current_page');
			if (current_page < evt.data.numPages - 1) {
				selectPage(current_page + 1);
			}
			return false;
		});

		// When all initialisation is done, draw the links
		links = renderer.getLinks(current_page, paginationClickHandler);
		containers.empty();
		links.appendTo(containers);
		// call callback function
		if (opts.load_first_page) {
			opts.callback(current_page, containers);
		}
	} // End of $.fn.pagination block

})(jQuery);
