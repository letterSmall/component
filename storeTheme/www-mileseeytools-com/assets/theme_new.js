function onYouTubeIframeAPIReady() {
	theme.Video.loadVideos()
}
window.theme = window.theme || {}, window.theme = window.theme || {}, theme.Sections = function() {
	this.constructors = {}, this.instances = [], $(document).on("shopify:section:load", this._onSectionLoad.bind(this)).on("shopify:section:unload", this._onSectionUnload.bind(this)).on("shopify:section:select", this._onSelect.bind(this)).on("shopify:section:deselect", this._onDeselect.bind(this)).on("shopify:block:select", this._onBlockSelect.bind(this)).on("shopify:block:deselect", this._onBlockDeselect.bind(this))
}, theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
	_createInstance: function(t, e) {
		var a = $(t),
			i = a.attr("data-section-id"),
			r = a.attr("data-section-type");
		if (e = e || this.constructors[r], !_.isUndefined(e)) {
			var o = _.assignIn(new e(t), {
				id: i,
				type: r,
				container: t
			});
			this.instances.push(o)
		}
	},
	_onSectionLoad: function(t) {
		var e = $("[data-section-id]", t.target)[0];
		e && this._createInstance(e)
	},
	_onSectionUnload: function(t) {
		this.instances = _.filter(this.instances, function(e) {
			var a = e.id === t.detail.sectionId;
			return a && _.isFunction(e.onUnload) && e.onUnload(t), !a
		})
	},
	_onSelect: function(t) {
		var e = _.find(this.instances, function(e) {
			return e.id === t.detail.sectionId
		});
		!_.isUndefined(e) && _.isFunction(e.onSelect) && e.onSelect(t)
	},
	_onDeselect: function(t) {
		var e = _.find(this.instances, function(e) {
			return e.id === t.detail.sectionId
		});
		!_.isUndefined(e) && _.isFunction(e.onDeselect) && e.onDeselect(t)
	},
	_onBlockSelect: function(t) {
		var e = _.find(this.instances, function(e) {
			return e.id === t.detail.sectionId
		});
		!_.isUndefined(e) && _.isFunction(e.onBlockSelect) && e.onBlockSelect(t)
	},
	_onBlockDeselect: function(t) {
		var e = _.find(this.instances, function(e) {
			return e.id === t.detail.sectionId
		});
		!_.isUndefined(e) && _.isFunction(e.onBlockDeselect) && e.onBlockDeselect(t)
	},
	register: function(t, e) {
		this.constructors[t] = e, $("[data-section-type=" + t + "]").each(function(t, a) {
			this._createInstance(a, e)
		}.bind(this))
	}
}), window.slate = window.slate || {}, slate.utils = {
	getParameterByName: function(t, e) {
		e || (e = window.location.href), t = t.replace(/[[\]]/g, "\\$&");
		var a = new RegExp("[?&]" + t + "(=([^&#]*)|&|#|$)").exec(e);
		return a ? a[2] ? decodeURIComponent(a[2].replace(/\+/g, " ")) : "" : null
	},
	keyboardKeys: {
		TAB: 9,
		ENTER: 13,
		ESCAPE: 27,
		LEFTARROW: 37,
		RIGHTARROW: 39
	}
}, window.slate = window.slate || {}, slate.rte = {
	wrapTable: function(t) {
		t.$tables.wrap('<div class="' + t.tableWrapperClass + '"></div>')
	},
	wrapIframe: function(t) {
		t.$iframes.each(function() {
			$(this).wrap('<div class="' + t.iframeWrapperClass + '"></div>'), this.src = this.src
		})
	}
}, window.slate = window.slate || {}, slate.a11y = {
	pageLinkFocus: function(t) {
		var e = "js-focus-hidden";
		t.first().attr("tabIndex", "-1").focus().addClass(e).one("blur", function() {
			t.first().removeClass(e).removeAttr("tabindex")
		})
	},
	focusHash: function() {
		var t = window.location.hash;
		t && document.getElementById(t.slice(1)) && this.pageLinkFocus($(t))
	},
	bindInPageLinks: function() {
		$("a[href*=#]").on("click", function(t) {
			this.pageLinkFocus($(t.currentTarget.hash))
		}.bind(this))
	},
	trapFocus: function(t) {
		var e = {
			focusin: t.namespace ? "focusin." + t.namespace : "focusin",
			focusout: t.namespace ? "focusout." + t.namespace : "focusout",
			keydown: t.namespace ? "keydown." + t.namespace : "keydown.handleFocus"
		},
			a = t.$container.find($('button, [href], input, select, textarea, [tabindex]:not([tabindex^="-"])').filter(":visible")),
			i = a[0],
			r = a[a.length - 1];
		t.$elementToFocus || (t.$elementToFocus = t.$container), t.$container.attr("tabindex", "-1"), t.$elementToFocus.focus(), $(document).off("focusin"), $(document).on(e.focusout, function() {
			$(document).off(e.keydown)
		}), $(document).on(e.focusin, function(t) {
			t.target !== r && t.target !== i || $(document).on(e.keydown, function(t) {
				!
				function(t) {
					t.keyCode === slate.utils.keyboardKeys.TAB && (t.target !== r || t.shiftKey || (t.preventDefault(), i.focus()), t.target === i && t.shiftKey && (t.preventDefault(), r.focus()))
				}(t)
			})
		})
	},
	removeTrapFocus: function(t) {
		var e = t.namespace ? "focusin." + t.namespace : "focusin";
		t.$container && t.$container.length && t.$container.removeAttr("tabindex"), $(document).off(e)
	},
	accessibleLinks: function(t) {
		var e = document.querySelector("body"),
			a = {
				newWindow: "a11y-new-window-message",
				external: "a11y-external-message",
				newWindowExternal: "a11y-new-window-external-message"
			};
		void 0 !== t.$links && t.$links.jquery || (t.$links = $("a[href]:not([aria-describedby])")), $.each(t.$links, function() {
			var t = $(this),
				e = t.attr("target"),
				i = t.attr("rel"),
				r = function(t) {
					var e = window.location.hostname;
					return t[0].hostname !== e
				}(t),
				o = "_blank" === e;
			r && t.attr("aria-describedby", a.external), o && (void 0 !== i && -1 !== i.indexOf("noopener") || t.attr("rel", function(t, e) {
				return (void 0 === e ? "" : e + " ") + "noopener"
			}), t.attr("aria-describedby", a.newWindow)), r && o && t.attr("aria-describedby", a.newWindowExternal)
		}), function(t) {
			"object" != typeof t && (t = {});
			var i = $.extend({
				newWindow: "Opens in a new window.",
				external: "Opens external website.",
				newWindowExternal: "Opens external website in a new window."
			}, t),
				r = document.createElement("ul"),
				o = "";
			for (var n in i) o += "<li id=" + a[n] + ">" + i[n] + "</li>";
			r.setAttribute("hidden", !0), r.innerHTML = o, e.appendChild(r)
		}(t.messages)
	}
}, theme.Images = function() {
	return {
		preload: function(t, e) {
			"string" == typeof t && (t = [t]);
			for (var a = 0; a < t.length; a++) {
				var i = t[a];
				this.loadImage(this.getSizedImageUrl(i, e))
			}
		},
		loadImage: function(t) {
			(new Image).src = t
		},
		switchImage: function(t, e, a) {
			var i = this.imageSize(e.src),
				r = this.getSizedImageUrl(t.src, i);
			a ? a(r, t, e) : e.src = r
		},
		imageSize: function(t) {
			var e = t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\\.@]/);
			return null !== e ? void 0 !== e[2] ? e[1] + e[2] : e[1] : null
		},
		getSizedImageUrl: function(t, e) {
			if (null === e) return t;
			if ("master" === e) return this.removeProtocol(t);
			var a = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);
			if (null !== a) {
				var i = t.split(a[0]),
					r = a[0];
				return this.removeProtocol(i[0] + "_" + e + r)
			}
			return null
		},
		removeProtocol: function(t) {
			return t.replace(/http(s)?:/, "")
		}
	}
}(), theme.Currency = function() {
	var t = "${{amount}}";
	return {
		formatMoney: function(e, a) {
			"string" == typeof e && (e = e.replace(".", ""));
			var i = "",
				r = /\{\{\s*(\w+)\s*\}\}/,
				o = a || t;

			function n(t, e, a, i) {
				if (a = a || ",", i = i || ".", isNaN(t) || null === t) return 0;
				var r = (t = (t / 100).toFixed(e)).split(".");
				return r[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (r[1] ? i + r[1] : "")
			}
			switch (o.match(r)[1]) {
			case "amount":
				i = n(e, 2);
				break;
			case "amount_no_decimals":
				i = n(e, 0);
				break;
			case "amount_with_comma_separator":
				i = n(e, 2, ".", ",");
				break;
			case "amount_no_decimals_with_comma_separator":
				i = n(e, 0, ".", ",");
				break;
			case "amount_no_decimals_with_space_separator":
				i = n(e, 0, " ");
				break;
			case "amount_with_apostrophe_separator":
				i = n(e, 2, "'")
			}
			return o.replace(r, i)
		}
	}
}(), slate.Variants = function() {
	function t(t) {
		this.$container = t.$container, this.product = t.product, this.singleOptionSelector = t.singleOptionSelector, this.originalSelectorId = t.originalSelectorId, this.enableHistoryState = t.enableHistoryState, this.currentVariant = this._getVariantFromOptions(), this._firstupdateVariant(this.currentVariant), $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
	}
	return t.prototype = _.assignIn({}, t.prototype, {
		_getCurrentOptions: function() {
			var t = _.map($(this.singleOptionSelector, this.$container), function(t) {
				var e = $(t),
					a = e.attr("type"),
					i = {};
				return "radio" === a || "checkbox" === a ? !! e[0].checked && (i.value = e.val(), i.index = e.data("index"), i) : (i.value = e.val(), i.index = e.data("index"), i)
			});
			return t = _.compact(t)
		},
		_getVariantFromOptions: function() {
			var t, e, a, i = this._getCurrentOptions(),
				r = this.product.variants,
				o = !1;
			$(".selector-wrapper-1", this.$container).hasClass("swatch") && (o = !0);
			var n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			});
			return null != n && 0 != n.available || (1 == o ? (t = $(".selector-wrapper-1", this.$container).find("input:checked").val(), e = $(".selector-wrapper-2", this.$container).find("input:checked").val(), a = $(".selector-wrapper-3", this.$container).find("input:checked").val(), $(".selector-wrapper-3 .swatch-element", this.$container).each(function() {
				var a = $(this).data("value"),
					i = r.find(function(i) {
						return i.option1 == t && i.option2 == e && i.option3 == a && i.available
					});
				null == i ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0), $(".label-value-3", this.$container).html(i.option3))
			}), i = this._getCurrentOptions(), null != (n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			})) && 0 != n.available || ($(".selector-wrapper-3 .swatch-element", this.$container).each(function() {
				var e = $(this).data("value"),
					a = r.find(function(a) {
						return a.option1 == t && a.option3 == e && a.available
					});
				null == a ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0), $(".label-value-3", this.$container).html(a.option3))
			}), a = $(".selector-wrapper-3", this.$container).find("input:checked").val(), $(".selector-wrapper-2 .swatch-element", this.$container).each(function() {
				var e = $(this).data("value"),
					i = r.find(function(i) {
						return i.option1 == t && i.option3 == a && i.option2 == e && i.available
					});
				null == i ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0), $(".label-value-2", this.$container).html(i.option2))
			}), i = this._getCurrentOptions(), n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			}))) : (t = $(".selector-wrapper-1", this.$container).find("option:selected").val(), e = $(".selector-wrapper-2", this.$container).find("option:selected").val(), a = $(".selector-wrapper-3", this.$container).find("option:selected").val(), $(".selector-wrapper-3 .single-option-selector option", this.$container).each(function() {
				var a = $(this).val(),
					i = r.find(function(i) {
						return i.option1 == t && i.option2 == e && i.option3 == a && i.available
					});
				null == i ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-3", this.$container).html(i.option3))
			}), i = this._getCurrentOptions(), null != (n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			})) && 0 != n.available || ($(".selector-wrapper-3 .single-option-selector option", this.$container).each(function() {
				var e = $(this).val(),
					a = r.find(function(a) {
						return a.option1 == t && a.option3 == e && a.available
					});
				null == a ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-3", this.$container).html(a.option3))
			}), a = $(".selector-wrapper-3", this.$container).find("option:selected").val(), $(".selector-wrapper-2 .single-option-selector option", this.$container).each(function() {
				var e = $(this).val(),
					i = r.find(function(i) {
						return i.option1 == t && i.option3 == a && i.option2 == e && i.available
					});
				null == i ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-2", this.$container).html(i.option2))
			}), i = this._getCurrentOptions(), n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			})))), n
		},
		_onSelectChange: function() {
			var t = this._getVariantFromOptions();
			if (this.$container.trigger({
				type: "variantChange",
				variant: t
			}), t) {
				if (this._updateMasterSelect(t), this._updatePrice(t), 0 == $("[data-change-group-image]").length && this._updateImages(t), $("[data-change-group-image]").length) {
					var e = $("[data-change-group-image]").find(".swatch-element.color :radio:checked"),
						a = e.data("filter");
					if (null == a) if ($("input[data-filter]").is(":checked")) a = $("input[data-filter]:checked").data("filter");
					if (void 0 !== a) {
						var i = $("#ProductSection-product-template .product_layout .product_photos .product-slider").find(".slider-nav"),
							r = $("#ProductSection-product-template .product_layout .product_photos .product-slider").find(".slider-for");
						if (void 0 !== a) {
							i.slick("slickUnfilter"), r.slick("slickUnfilter"), i.find(a).length && r.find(a).length && (i.slick("slickFilter", a).slick("refresh"), r.slick("slickFilter", a).slick("refresh"));
							var o = e.data("image-input");
							$(".slider-nav .item").each(function() {
								var t = $(this).find("img").attr("src");
								o == t && ($(".product-single__thumbnail--product-template").removeClass("active-thumb"), $(this).trigger("click"))
							})
						}
					}
					this._updateImages(t)
				}
				this._updateSKU(t), this._updateVariant(t), this.currentVariant = t, this.enableHistoryState && this._updateHistoryState(t)
			}
		},
		_updateImages: function(t) {
			var e = t.featured_image || {},
				a = this.currentVariant.featured_image || {};
			t.featured_image && e.src !== a.src && this.$container.trigger({
				type: "variantImageChange",
				variant: t
			})
		},
		_updatePrice: function(t) {
			t.price === this.currentVariant.price && t.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
				type: "variantPriceChange",
				variant: t
			})
		},
		_updateSKU: function(t) {
			t.sku !== this.currentVariant.sku && this.$container.trigger({
				type: "variantSKUChange",
				variant: t
			})
		},
		_updateHistoryState: function(t) {
			if (history.replaceState && t) {
				var e = window.location.protocol + "//" + window.location.host + window.location.pathname + "?variant=" + t.id;
				window.history.replaceState({
					path: e
				}, "", e)
			}
		},
		_firstupdateVariant: function(t) {
			var e = this,
				a = !1;
			if ($(".selector-wrapper-1", this.$container).hasClass("swatch") && (a = !0), t) {
				if (1 == a) {
					var i = this.product.variants,
						r = $(".selector-wrapper", this.$container),
						o = $(".selector-wrapper-1", this.$container).find("input:checked").val(),
						n = $(".selector-wrapper-2", this.$container).find("input:checked").val();
					$(".selector-wrapper-3", this.$container).find("input:checked").val();
					r.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find(".swatch-element");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).data("value");
								null == i.find(function(e) {
									return e.option1 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).data("value");
								null == i.find(function(e) {
									return e.option1 == o && e.option2 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).data("value");
								null == i.find(function(e) {
									return e.option1 == o && e.option2 == n && e.option3 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							})
						}
					})
				} else {
					i = this.product.variants, r = $(".selector-wrapper", this.$container), o = $(".selector-wrapper-1", this.$container).find("option:selected").val(), n = $(".selector-wrapper-2", this.$container).find("option:selected").val(), $(".selector-wrapper-3", this.$container).find("option:selected").val();
					r.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find("option");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).val();
								null == i.find(function(e) {
									return e.option1 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).val();
								null == i.find(function(e) {
									return e.option1 == o && e.option2 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).val();
								null == i.find(function(e) {
									return e.option1 == o && e.option2 == n && e.option3 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							})
						}
					})
				}
				if (null == t.featured_media) return;
				var s = t.featured_media.id;
				$(document).ready(function() {
					e._switchImage(s), e._setActiveThumbnail(s)
				})
			}
		},
		_updateVariant: function(t) {
			var e = !1;
			if ($(".selector-wrapper-1", this.$container).hasClass("swatch") && (e = !0), t) {
				t.option1, t.option2, t.option3;
				if (1 == e) {
					var a = this.product.variants,
						i = $(".selector-wrapper", this.$container),
						r = $(".selector-wrapper-1", this.$container).find("input:checked").val(),
						o = $(".selector-wrapper-2", this.$container).find("input:checked").val();
					$(".selector-wrapper-3", this.$container).find("input:checked").val();
					i.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find(".swatch-element");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).data("value");
								null == a.find(function(e) {
									return e.option1 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).data("value");
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).data("value");
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == o && e.option3 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							})
						}
					})
				} else {
					a = this.product.variants, i = $(".selector-wrapper", this.$container), r = $(".selector-wrapper-1", this.$container).find("option:selected").val(), o = $(".selector-wrapper-2", this.$container).find("option:selected").val(), $(".selector-wrapper-3", this.$container).find("option:selected").val();
					i.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find("option");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).val();
								null == a.find(function(e) {
									return e.option1 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).val();
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).val();
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == o && e.option3 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							})
						}
					})
				}
			}
		},
		_switchImage: function(t) {
			$(".product_template .product-single__photo[data-image-id='" + t + "']"), $(".product_template .product-single__photo:not([data-image-id='" + t + "'])")
		},
		_setActiveThumbnail: function(t) {
			void 0 === t && (t = $(".product_template .product-single__photo:not(.hide)").data("image-id"));
			var e = $(".product_template .product-single__thumbnails-item:not(.slick-cloned)"),
				a = e.find(".product-single__thumbnail--product-template[data-thumbnail-id='" + t + "']");
			if ($(".product-single__thumbnail--product-template").removeClass("active-thumb").removeAttr("aria-current"), a.addClass("active-thumb"), a.attr("aria-current", !0), e.hasClass("slick-slide")) {
				var i = a.parent().data("slick-index");
				$(".product-single__thumbnails-product-template").slick("slickGoTo", i)
			}
		},
		_updateMasterSelect: function(t) {
			$(this.originalSelectorId, this.$container).val(t.id)
		}
	}), t
}(), slate.Variants2 = function() {
	function t(t) {
		this.$container = t.$container, this.product = t.product, this.singleOptionSelector = t.singleOptionSelector, this.originalSelectorId = t.originalSelectorId, this.enableHistoryState = t.enableHistoryState, this.currentVariant = this._getVariantFromOptions(), this._firstupdateVariant(this.currentVariant), $(this.singleOptionSelector, this.$container).on("change", this._onSelectChange.bind(this))
	}
	return t.prototype = _.assignIn({}, t.prototype, {
		_getCurrentOptions: function() {
			var t = _.map($(this.singleOptionSelector, this.$container), function(t) {
				var e = $(t),
					a = e.attr("type"),
					i = {};
				return "radio" === a || "checkbox" === a ? !! e[0].checked && (i.value = e.val(), i.index = e.data("index"), i) : (i.value = e.val(), i.index = e.data("index"), i)
			});
			return t = _.compact(t)
		},
		_getVariantFromOptions: function() {
			var t, e, a, i = this._getCurrentOptions(),
				r = this.product.variants,
				o = !1;
			$(".selector-wrapper-1", this.$container).hasClass("swatch") && (o = !0);
			var n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			});
			return null != n && 0 != n.available || (1 == o ? (t = $(".selector-wrapper-1", this.$container).find("input:checked").val(), e = $(".selector-wrapper-2", this.$container).find("input:checked").val(), a = $(".selector-wrapper-3", this.$container).find("input:checked").val(), $(".selector-wrapper-3 .swatch-element", this.$container).each(function() {
				var a = $(this).data("value"),
					i = r.find(function(i) {
						return i.option1 == t && i.option2 == e && i.option3 == a && i.available
					});
				null == i ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0), $(".label-value-3", this.$container).html(i.option3))
			}), i = this._getCurrentOptions(), null != (n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			})) && 0 != n.available || ($(".selector-wrapper-3 .swatch-element", this.$container).each(function() {
				var e = $(this).data("value"),
					a = r.find(function(a) {
						return a.option1 == t && a.option3 == e && a.available
					});
				null == a ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0), $(".label-value-3", this.$container).html(a.option3))
			}), a = $(".selector-wrapper-3", this.$container).find("input:checked").val(), $(".selector-wrapper-2 .swatch-element", this.$container).each(function() {
				var e = $(this).data("value"),
					i = r.find(function(i) {
						return i.option1 == t && i.option3 == a && i.option2 == e && i.available
					});
				null == i ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0), $(".label-value-2", this.$container).html(i.option2))
			}), i = this._getCurrentOptions(), n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			}))) : (t = $(".selector-wrapper-1", this.$container).find("option:selected").val(), e = $(".selector-wrapper-2", this.$container).find("option:selected").val(), a = $(".selector-wrapper-3", this.$container).find("option:selected").val(), $(".selector-wrapper-3 .single-option-selector option", this.$container).each(function() {
				var a = $(this).val(),
					i = r.find(function(i) {
						return i.option1 == t && i.option2 == e && i.option3 == a && i.available
					});
				null == i ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-3", this.$container).html(i.option3))
			}), i = this._getCurrentOptions(), null != (n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			})) && 0 != n.available || ($(".selector-wrapper-3 .single-option-selector option", this.$container).each(function() {
				var e = $(this).val(),
					a = r.find(function(a) {
						return a.option1 == t && a.option3 == e && a.available
					});
				null == a ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-3", this.$container).html(a.option3))
			}), a = $(".selector-wrapper-3", this.$container).find("option:selected").val(), $(".selector-wrapper-2 .single-option-selector option", this.$container).each(function() {
				var e = $(this).val(),
					i = r.find(function(i) {
						return i.option1 == t && i.option3 == a && i.option2 == e && i.available
					});
				null == i ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-2", this.$container).html(i.option2))
			}), i = this._getCurrentOptions(), n = _.find(r, function(t) {
				return i.every(function(e) {
					return _.isEqual(t[e.index], e.value)
				})
			})))), n
		},
		_onSelectChange: function() {
			var t = this._getVariantFromOptions();
			if (this.$container.trigger({
				type: "variantChange",
				variant: t
			}), t) {
				this._updateMasterSelect(t), 0 == $("[data-change-group-image]").length && this._updateImages(t), this._updatePrice(t), this._updateSKU(t), this._updateVariant(t), this.currentVariant = t, this.enableHistoryState && this._updateHistoryState(t);
				var e = $("[data-change-group-image-qv]").find(".swatch-element.color :radio:checked");
				if (null == (a = e.data("filter"))) if ($("input[data-filter]").is(":checked")) a = $("input[data-filter]:checked").data("filter");
				if ($("[data-change-group-image-qv]").length && void 0 !== a) {
					var a, i = $("[data-change-group-image-qv]").find(".slider-nav"),
						r = $("[data-change-group-image-qv]").find(".slider-for");
					if (e.length) if (void 0 !== (a = e.data("filter"))) {
						i.slick("slickUnfilter"), r.slick("slickUnfilter"), i.find(a).length && r.find(a).length && (i.slick("slickFilter", a).slick("refresh"), r.slick("slickFilter", a).slick("refresh"));
						var o = e.data("image-input");
						$("[data-change-group-image-qv] .slider-nav .item").each(function() {
							var t = $(this).find("img").attr("src");
							o == t && ($(".product-single__thumbnail").removeClass("active-thumb"), $(this).trigger("click"))
						})
					}
					this._updateImages(t)
				}
			}
		},
		_updateImages: function(t) {
			var e = t.featured_image || {},
				a = this.currentVariant.featured_image || {};
			t.featured_image && e.src !== a.src && this.$container.trigger({
				type: "variantImageChange",
				variant: t
			})
		},
		_updatePrice: function(t) {
			t.price === this.currentVariant.price && t.compare_at_price === this.currentVariant.compare_at_price || this.$container.trigger({
				type: "variantPriceChange",
				variant: t
			})
		},
		_updateSKU: function(t) {
			t.sku !== this.currentVariant.sku && this.$container.trigger({
				type: "variantSKUChange",
				variant: t
			})
		},
		_updateHistoryState: function(t) {
			if (history.replaceState && t) {
				var e = window.location.protocol + "//" + window.location.host + window.location.pathname;
				window.history.replaceState({
					path: e
				}, "", e)
			}
		},
		_firstupdateVariant: function(t) {
			var e = !1;
			if ($(".selector-wrapper-1", this.$container).hasClass("swatch") && (e = !0), t) if (1 == e) {
				var a = this.product.variants,
					i = $(".selector-wrapper", this.$container),
					r = $(".selector-wrapper-1", this.$container).find("input:checked").val(),
					o = $(".selector-wrapper-2", this.$container).find("input:checked").val();
				$(".selector-wrapper-3", this.$container).find("input:checked").val();
				i.each(function() {
					var t = $(this).data("option-index"),
						e = $(this).find(".swatch-element");
					switch (t) {
					case 1:
						e.each(function() {
							var t = $(this).data("value");
							null == a.find(function(e) {
								return e.option1 == t && e.available
							}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
						});
						break;
					case 2:
						e.each(function() {
							var t = $(this).data("value");
							null == a.find(function(e) {
								return e.option1 == r && e.option2 == t && e.available
							}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
						});
						break;
					case 3:
						e.each(function() {
							var t = $(this).data("value");
							null == a.find(function(e) {
								return e.option1 == r && e.option2 == o && e.option3 == t && e.available
							}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
						})
					}
				})
			} else {
				a = this.product.variants, i = $(".selector-wrapper", this.$container), r = $(".selector-wrapper-1", this.$container).find("option:selected").val(), o = $(".selector-wrapper-2", this.$container).find("option:selected").val(), $(".selector-wrapper-3", this.$container).find("option:selected").val();
				i.each(function() {
					var t = $(this).data("option-index"),
						e = $(this).find("option");
					switch (t) {
					case 1:
						e.each(function() {
							var t = $(this).val();
							null == a.find(function(e) {
								return e.option1 == t && e.available
							}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
						});
						break;
					case 2:
						e.each(function() {
							var t = $(this).val();
							null == a.find(function(e) {
								return e.option1 == r && e.option2 == t && e.available
							}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
						});
						break;
					case 3:
						e.each(function() {
							var t = $(this).val();
							null == a.find(function(e) {
								return e.option1 == r && e.option2 == o && e.option3 == t && e.available
							}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
						})
					}
				})
			}
		},
		_updateVariant: function(t) {
			var e = !1;
			if ($(".selector-wrapper-1", this.$container).hasClass("swatch") && (e = !0), t) {
				t.option1, t.option2, t.option3;
				if (1 == e) {
					var a = this.product.variants,
						i = $(".selector-wrapper", this.$container),
						r = $(".selector-wrapper-1", this.$container).find("input:checked").val(),
						o = $(".selector-wrapper-2", this.$container).find("input:checked").val();
					$(".selector-wrapper-3", this.$container).find("input:checked").val();
					i.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find(".swatch-element");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).data("value");
								null == a.find(function(e) {
									return e.option1 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).data("value");
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).data("value");
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == o && e.option3 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							})
						}
					})
				} else {
					a = this.product.variants, i = $(".selector-wrapper", this.$container), r = $(".selector-wrapper-1", this.$container).find("option:selected").val(), o = $(".selector-wrapper-2", this.$container).find("option:selected").val(), $(".selector-wrapper-3", this.$container).find("option:selected").val();
					i.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find("option");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).val();
								null == a.find(function(e) {
									return e.option1 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).val();
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).val();
								null == a.find(function(e) {
									return e.option1 == r && e.option2 == o && e.option3 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							})
						}
					})
				}
			}
		},
		_updateMasterSelect: function(t) {
			$(this.originalSelectorId, this.$container).val(t.id)
		}
	}), t
}(), theme.Drawers = function() {
	function t(t, e, a) {
		var i = {
			close: ".js-drawer-close",
			open: ".js-drawer-open-" + e,
			openClass: "js-drawer-open",
			dirOpenClass: "js-drawer-open-" + e
		};
		if (this.nodes = {
			$parent: $("html").add("body"),
			$page: $("#PageContainer")
		}, this.config = $.extend(i, a), this.position = e, this.$drawer = $("#" + t), !this.$drawer.length) return !1;
		this.drawerIsOpen = !1, this.init()
	}
	return t.prototype.init = function() {
		$(this.config.open).on("click", $.proxy(this.open, this)), this.$drawer.on("click", this.config.close, $.proxy(this.close, this))
	}, t.prototype.open = function(t) {
		var e = !1;
		return t ? t.preventDefault() : e = !0, t && t.stopPropagation && (t.stopPropagation(), this.$activeSource = $(t.currentTarget)), this.drawerIsOpen && !e ? this.close() : (this.$drawer.prepareTransition(), this.nodes.$parent.addClass(this.config.openClass + " " + this.config.dirOpenClass), this.drawerIsOpen = !0, slate.a11y.trapFocus({
			$container: this.$drawer,
			namespace: "drawer_focus"
		}), this.config.onDrawerOpen && "function" == typeof this.config.onDrawerOpen && (e || this.config.onDrawerOpen()), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "true"), this.bindEvents(), this)
	}, t.prototype.close = function() {
		this.drawerIsOpen && ($(document.activeElement).trigger("blur"), this.$drawer.prepareTransition(), this.nodes.$parent.removeClass(this.config.dirOpenClass + " " + this.config.openClass), this.$activeSource && this.$activeSource.attr("aria-expanded") && this.$activeSource.attr("aria-expanded", "false"), this.drawerIsOpen = !1, slate.a11y.removeTrapFocus({
			$container: this.$drawer,
			namespace: "drawer_focus"
		}), this.unbindEvents(), this.config.onDrawerClose && "function" == typeof this.config.onDrawerClose && this.config.onDrawerClose())
	}, t.prototype.bindEvents = function() {
		this.nodes.$parent.on("keyup.drawer", $.proxy(function(t) {
			return 27 !== t.keyCode || (this.close(), !1)
		}, this)), this.nodes.$page.on("touchmove.drawer", function() {
			return !1
		}), this.nodes.$page.on("click.drawer", $.proxy(function() {
			return this.close(), !1
		}, this))
	}, t.prototype.unbindEvents = function() {
		this.nodes.$page.off(".drawer"), this.nodes.$parent.off(".drawer")
	}, t
}(), window.theme = window.theme || {}, theme.Search = function() {
	var t = {
		search: ".search",
		searchSubmit: ".search__submit",
		searchInput: ".search__input",
		siteHeader: ".site-header",
		siteHeaderSearchToggle: ".site-header__search-toggle",
		siteHeaderSearch: ".site-header__search",
		searchDrawer: ".search-bar",
		searchDrawerInput: ".search-bar__input",
		searchHeader: ".search-header",
		searchHeaderInput: ".search-header__input",
		searchHeaderSubmit: ".search-header__submit",
		searchResultSubmit: "#SearchResultSubmit",
		searchResultInput: "#SearchInput",
		searchResultMessage: "[data-search-error-message]",
		mobileNavWrapper: ".mobile-nav-wrapper"
	},
		e = {
			focus: "search--focus",
			hidden: "hide",
			mobileNavIsOpen: "js-menu--is-open",
			searchTemplate: "template-search"
		};

	function a() {
		i($(t.searchDrawerInput))
	}
	function i(t) {
		t.focus(), t[0].setSelectionRange(0, t[0].value.length)
	}
	function r() {
		$(t.siteHeaderSearchToggle).focus()
	}
	function o(t) {
		0 === this.$searchResultInput.val().trim().length ? (void 0 !== t && t.preventDefault(), i(this.$searchResultInput), function() {
			this.$searchErrorMessage.removeClass(e.hidden), this.$searchResultInput.attr("aria-describedby", "error-search-form").attr("aria-invalid", !0)
		}.call(this)) : function() {
			this.$searchErrorMessage.addClass(e.hidden), this.$searchResultInput.removeAttr("aria-describedby").removeAttr("aria-invalid")
		}.call(this)
	}
	return {
		init: function() {
			$(t.siteHeader).length && (this.$searchResultInput = $(t.searchResultInput), this.$searchErrorMessage = $(t.searchResultMessage), $("#PageContainer").addClass("drawer-page-content"), $(".js-drawer-open-top").attr("aria-controls", "SearchDrawer").attr("aria-expanded", "false").attr("aria-haspopup", "dialog"), theme.SearchDrawer = new theme.Drawers("SearchDrawer", "top", {
				onDrawerOpen: a,
				onDrawerClose: r
			}), null !== slate.utils.getParameterByName("q") && $("body").hasClass(e.searchTemplate) && o.call(this), $(t.searchResultSubmit).on("click", o.bind(this)), $(t.searchHeaderInput).add(t.searchHeaderSubmit).on("focus blur", function() {
				$(t.searchHeader).toggleClass(e.focus)
			}), $(t.siteHeaderSearchToggle).on("click", function() {
				var e = $(t.siteHeader).outerHeight(),
					a = $(t.siteHeader).offset().top - e;
				$(t.searchDrawer).css({
					height: e + "px",
					top: a + "px"
				})
			}))
		}
	}
}(), function() {
	var t = $(".return-link");

	function e(t) {
		var e = document.createElement("a");
		return e.ref = t, e.hostname
	}
	document.referrer && t.length && window.history.length && t.one("click", function(t) {
		t.preventDefault();
		var a = e(document.referrer);
		return e(window.location.href) === a && history.back(), !1
	})
}(), theme.Video = function() {
	var t = !1,
		e = !1,
		a = !1,
		i = !1,
		r = {},
		o = [],
		n = {
			ratio: 16 / 9,
			scrollAnimationDuration: 400,
			playerVars: {
				iv_load_policy: 3,
				modestbranding: 1,
				autoplay: 0,
				controls: 0,
				wmode: "opaque",
				branding: 0,
				autohide: 0,
				rel: 0
			},
			events: {
				onReady: function(t) {
					t.target.setPlaybackQuality("hd1080");
					var e = g(t);
					h(), $("#" + e.id).attr("tabindex", "-1"), _(), "background" === e.type && (t.target.mute(), p(e.id));
					e.$videoWrapper.addClass(s.loaded)
				},
				onStateChange: function(e) {
					var a = g(e);
					"background" !== a.status || C() || t || e.data !== YT.PlayerState.PLAYING && e.data !== YT.PlayerState.BUFFERING || (u(!0), t = !0, a.$videoWrapper.removeClass(s.loading));
					switch (e.data) {
					case YT.PlayerState.ENDED:
						!
						function(t) {
							switch (t.type) {
							case "background":
								o[t.id].seekTo(0);
								break;
							case "image_with_play":
								v(t.id), b(t.id, !1)
							}
						}(a);
						break;
					case YT.PlayerState.PAUSED:
						setTimeout(function() {
							e.target.getPlayerState() === YT.PlayerState.PAUSED && f(a)
						}, 200)
					}
				}
			}
		},
		s = {
			playing: "video-is-playing",
			paused: "video-is-paused",
			loading: "video-is-loading",
			loaded: "video-is-loaded",
			backgroundVideoWrapper: "video-background-wrapper",
			videoWithImage: "video--image_with_play",
			backgroundVideo: "video--background",
			userPaused: "is-paused",
			supportsAutoplay: "autoplay",
			supportsNoAutoplay: "no-autoplay",
			wrapperMinHeight: "video-section-wrapper--min-height"
		},
		c = {
			section: ".video-section",
			videoWrapper: ".video-section-wrapper",
			playVideoBtn: ".video-control__play",
			closeVideoBtn: ".video-control__close-wrapper",
			pauseVideoBtn: ".video__pause"
		};

	function d(t) {
		(e || a) && t && "function" == typeof o[t].playVideo && p(t)
	}
	function l(t) {
		o[t] && "function" == typeof o[t].pauseVideo && o[t].pauseVideo()
	}
	function p(e, i) {
		var n = r[e],
			c = o[e],
			d = n.$videoWrapper;
		if (a) m(n);
		else {
			if (i || t) return d.removeClass(s.loading), m(n), void c.playVideo();
			c.playVideo()
		}
	}
	function u(e) {
		var i = e ? s.supportsAutoplay : s.supportsNoAutoplay;
		$(document.documentElement).removeClass(s.supportsAutoplay).removeClass(s.supportsNoAutoplay).addClass(i), e || (a = !0), t = !0
	}
	function h() {
		e || (C() && (a = !0), a && u(!1), e = !0)
	}
	function m(t) {
		var e = t.$videoWrapper,
			a = e.find(c.pauseVideoBtn);
		e.removeClass(s.loading), a.hasClass(s.userPaused) && a.removeClass(s.userPaused), "background" !== t.status && ($("#" + t.id).attr("tabindex", "0"), "image_with_play" === t.type && e.removeClass(s.paused).addClass(s.playing), setTimeout(function() {
			e.find(c.closeVideoBtn).focus()
		}, n.scrollAnimationDuration))
	}
	function f(t) {
		var e = t.$videoWrapper;
		"image_with_play" === t.type && ("closed" === t.status ? e.removeClass(s.paused) : e.addClass(s.paused)), e.removeClass(s.playing)
	}
	function v(t) {
		var e = r[t],
			a = e.$videoWrapper,
			i = [s.paused, s.playing].join(" ");
		switch (C() && a.removeAttr("style"), $("#" + e.id).attr("tabindex", "-1"), e.status = "closed", e.type) {
		case "image_with_play":
			o[t].stopVideo(), f(e);
			break;
		case "background":
			o[t].mute(), function(t) {
				$("#" + t).removeClass(s.videoWithImage).addClass(s.backgroundVideo), r[t].$videoWrapper.addClass(s.backgroundVideoWrapper), r[t].status = "background", y($("#" + t))
			}(t)
		}
		a.removeClass(i)
	}
	function g(t) {
		return r[t.target.a.id]
	}
	function b(t, e) {
		var a = r[t],
			i = a.$videoWrapper.offset().top,
			o = a.$videoWrapper.find(c.playVideoBtn),
			d = 0,
			l = 0;
		C() && a.$videoWrapper.parent().toggleClass("page-width", !e), e ? (l = C() ? $(window).width() / n.ratio : a.$videoWrapper.width() / n.ratio, d = ($(window).height() - l) / 2, a.$videoWrapper.removeClass(s.wrapperMinHeight).animate({
			height: l
		}, 600), C() && Shopify.designMode || $("html, body").animate({
			scrollTop: i - d
		}, n.scrollAnimationDuration)) : (l = C() ? a.$videoWrapper.data("mobile-height") : a.$videoWrapper.data("desktop-height"), a.$videoWrapper.height(a.$videoWrapper.width() / n.ratio).animate({
			height: l
		}, 600), setTimeout(function() {
			a.$videoWrapper.addClass(s.wrapperMinHeight)
		}, 600), o.focus())
	}
	function w(t) {
		var e = r[t];
		switch (e.$videoWrapper.addClass(s.loading), e.$videoWrapper.attr("style", "height: " + e.$videoWrapper.height() + "px"), e.status = "open", e.type) {
		case "image_with_play":
			p(t, !0);
			break;
		case "background":
			!
			function(t) {
				$("#" + t).removeClass(s.backgroundVideo).addClass(s.videoWithImage), setTimeout(function() {
					$("#" + t).removeAttr("style")
				}, 600), r[t].$videoWrapper.removeClass(s.backgroundVideoWrapper).addClass(s.playing), r[t].status = "open"
			}(t), o[t].unMute(), p(t, !0)
		}
		b(t, !0), $(document).on("keydown.videoPlayer", function(t) {
			var e = $(document.activeElement).data("controls");
			t.keyCode === slate.utils.keyboardKeys.ESCAPE && e && (v(e), b(e, !1))
		})
	}
	function _() {
		$("." + s.backgroundVideo).each(function(t, e) {
			y($(e))
		})
	}
	function y(t) {
		if (i) if (C()) t.removeAttr("style");
		else {
			var e = t.closest(c.videoWrapper),
				a = e.width(),
				r = t.width(),
				o = e.data("desktop-height");
			a / n.ratio < o ? (r = Math.ceil(o * n.ratio), t.width(r).height(o).css({
				left: (a - r) / 2,
				top: 0
			})) : (o = Math.ceil(a / n.ratio), t.width(a).height(o).css({
				left: 0,
				top: (o - o) / 2
			})), t.prepareTransition(), e.addClass(s.loaded)
		}
	}
	function C() {
		return $(window).width() < 750 || window.mobileCheck()
	}
	function k() {
		$(document).on("click.videoPlayer", c.playVideoBtn, function(t) {
			w($(t.currentTarget).data("controls"))
		}), $(document).on("click.videoPlayer", c.closeVideoBtn, function(t) {
			var e = $(t.currentTarget).data("controls");
			$(t.currentTarget).blur(), v(e), b(e, !1)
		}), $(document).on("click.videoPlayer", c.pauseVideoBtn, function(t) {
			!
			function(t) {
				var e = r[t].$videoWrapper.find(c.pauseVideoBtn),
					a = e.hasClass(s.userPaused);
				a ? (e.removeClass(s.userPaused), d(t)) : (e.addClass(s.userPaused), l(t)), e.attr("aria-pressed", !a)
			}($(t.currentTarget).data("controls"))
		}), $(window).on("resize.videoPlayer", $.debounce(200, function() {
			if (i) {
				var t, e = window.innerHeight === screen.height;
				if (_(), C()) {
					for (t in r) r.hasOwnProperty(t) && (r[t].$videoWrapper.hasClass(s.playing) && (e || (l(t), f(r[t]))), r[t].$videoWrapper.height($(document).width() / n.ratio));
					u(!1)
				} else for (t in u(!0), r) r[t].$videoWrapper.find("." + s.videoWithImage).length || (o[t].playVideo(), m(r[t]))
			}
		})), $(window).on("scroll.videoPlayer", $.debounce(50, function() {
			if (i) for (var t in r) if (r.hasOwnProperty(t)) {
				var e = r[t].$videoWrapper;
				e.hasClass(s.playing) && (e.offset().top + .75 * e.height() < $(window).scrollTop() || e.offset().top + .25 * e.height() > $(window).scrollTop() + $(window).height()) && (v(t), b(t, !1))
			}
		}))
	}
	function P(t) {
		var e = $.extend({}, n, r[t]);
		e.playerVars.controls = e.controls, o[t] = new YT.Player(t, e)
	}
	return {
		init: function(t) {
			if (t.length) {
				if (r[t.attr("id")] = {
					id: t.attr("id"),
					videoId: t.data("id"),
					type: t.data("type"),
					status: "image_with_play" === t.data("type") ? "closed" : "background",
					$video: t,
					$videoWrapper: t.closest(c.videoWrapper),
					$section: t.closest(c.section),
					controls: "background" === t.data("type") ? 0 : 1
				}, !i) {
					var e = document.createElement("script");
					e.src = "https://www.youtube.com/iframe_api";
					var a = document.getElementsByTagName("script")[0];
					a.parentNode.insertBefore(e, a)
				}
				h()
			}
		},
		editorLoadVideo: function(t) {
			i && (P(t), k())
		},
		loadVideos: function() {
			for (var t in r) r.hasOwnProperty(t) && P(t);
			k(), i = !0
		},
		playVideo: d,
		pauseVideo: l,
		removeEvents: function() {
			$(document).off(".videoPlayer"), $(window).off(".videoPlayer")
		}
	}
}(), window.theme = window.theme || {}, theme.FormStatus = function() {
	var t = {
		statusMessage: "[data-form-status]"
	};
	return {
		init: function() {
			this.$statusMessage = $(t.statusMessage), this.$statusMessage && (this.$statusMessage.attr("tabindex", -1).focus(), this.$statusMessage.on("blur", function() {
				this.$statusMessage.removeAttr("tabindex")
			}.bind(this)))
		}
	}
}(), function() {
	var t = $("#BlogTagFilter");
	t.length && t.on("change", function() {
		location.href = $(this).val()
	})
}(), window.theme = theme || {}, theme.customerTemplates = function() {
	var t = {
		RecoverHeading: "#RecoverHeading",
		RecoverEmail: "#RecoverEmail",
		LoginHeading: "#LoginHeading"
	};

	function e() {
		this.$RecoverHeading = $(t.RecoverHeading), this.$RecoverEmail = $(t.RecoverEmail), this.$LoginHeading = $(t.LoginHeading), $("#RecoverPassword").on("click", function(t) {
			t.preventDefault(), a(), this.$RecoverHeading.attr("tabindex", "-1").focus()
		}.bind(this)), $("#HideRecoverPasswordLink").on("click", function(t) {
			t.preventDefault(), $("#RecoverPasswordForm").addClass("hide"), $("#CustomerLoginForm").removeClass("hide"), $("#CustomerRegisterForm").removeClass("hide"), this.$LoginHeading.attr("tabindex", "-1").focus()
		}.bind(this)), this.$RecoverHeading.on("blur", function() {
			$(this).removeAttr("tabindex")
		}), this.$LoginHeading.on("blur", function() {
			$(this).removeAttr("tabindex")
		})
	}
	function a() {
		$("#RecoverPasswordForm").removeClass("hide"), $("#CustomerLoginForm").addClass("hide"), $("#CustomerRegisterForm").addClass("hide"), "true" === this.$RecoverEmail.attr("aria-invalid") && this.$RecoverEmail.focus()
	}
	return {
		init: function() {
			var t, i;
			e(), function() {
				"#recover" === window.location.hash && a.bind(this)()
			}(), $(".reset-password-success").length && $("#ResetSuccess").removeClass("hide").focus(), t = $("#AddressNewForm"), i = $("#AddressNewButton"), t.length && (Shopify && new Shopify.CountryProvinceSelector("AddressCountryNew", "AddressProvinceNew", {
				hideElement: "AddressProvinceContainerNew"
			}), $(".address-country-option").each(function() {
				var t = $(this).data("form-id"),
					e = "AddressCountry_" + t,
					a = "AddressProvince_" + t,
					i = "AddressProvinceContainer_" + t;
				new Shopify.CountryProvinceSelector(e, a, {
					hideElement: i
				})
			}), $(".address-new-toggle").on("click", function() {
				var e = "true" === i.attr("aria-expanded");
				t.toggleClass("hide"), i.attr("aria-expanded", !e).focus()
			}), $(".address-edit-toggle").on("click", function() {
				var t = $(this).data("form-id"),
					e = $("#EditFormButton_" + t),
					a = $("#EditAddress_" + t),
					i = "true" === e.attr("aria-expanded");
				a.toggleClass("hide"), e.attr("aria-expanded", !i).focus()
			}), $(".address-delete").on("click", function() {
				var t = $(this),
					e = t.data("target"),
					a = t.data("confirm-message");
				confirm(a || "Are you sure you wish to delete this address?") && Shopify.postLink(e, {
					parameters: {
						_method: "delete"
					}
				})
			}))
		}
	}
}(), window.theme = window.theme || {}, theme.Cart = function() {
	var t = {
		cartCount: "[data-cart-count]",
		cartCountBubble: "[data-cart-count-bubble]",
		cartDiscount: "[data-cart-discount]",
		cartDiscountTitle: "[data-cart-discount-title]",
		cartDiscountAmount: "[data-cart-discount-amount]",
		cartDiscountWrapper: "[data-cart-discount-wrapper]",
		cartErrorMessage: "[data-cart-error-message]",
		cartErrorMessageWrapper: "[data-cart-error-message-wrapper]",
		cartItem: "[data-cart-item]",
		cartItemDetails: "[data-cart-item-details]",
		cartItemDiscount: "[data-cart-item-discount]",
		cartItemDiscountedPriceGroup: "[data-cart-item-discounted-price-group]",
		cartItemDiscountTitle: "[data-cart-item-discount-title]",
		cartItemDiscountAmount: "[data-cart-item-discount-amount]",
		cartItemDiscountList: "[data-cart-item-discount-list]",
		cartItemFinalPrice: "[data-cart-item-final-price]",
		cartItemImage: "[data-cart-item-image]",
		cartItemLinePrice: "[data-cart-item-line-price]",
		cartItemOriginalPrice: "[data-cart-item-original-price]",
		cartItemPrice: "[data-cart-item-price]",
		cartItemPriceList: "[data-cart-item-price-list]",
		cartItemProperty: "[data-cart-item-property]",
		cartItemPropertyName: "[data-cart-item-property-name]",
		cartItemPropertyValue: "[data-cart-item-property-value]",
		cartItemRegularPriceGroup: "[data-cart-item-regular-price-group]",
		cartItemRegularPrice: "[data-cart-item-regular-price]",
		cartItemTitle: "[data-cart-item-title]",
		cartItemOption: "[data-cart-item-option]",
		cartLineItems: "[data-cart-line-items]",
		cartNote: "[data-cart-notes]",
		cartQuantityErrorMessage: "[data-cart-quantity-error-message]",
		cartQuantityErrorMessageWrapper: "[data-cart-quantity-error-message-wrapper]",
		cartRemove: "[data-cart-remove]",
		cartRemoveAll: "[data-cart-remove-all]",
		cartupdate: "[data-qtt]",
		cartStatus: "[data-cart-status]",
		cartSubtotal: "[data-cart-subtotal]",
		cartTableCell: "[data-cart-table-cell]",
		cartWrapper: "[data-cart-wrapper]",
		emptyPageContent: "[data-empty-page-content]",
		quantityInput: "[data-quantity-input]",
		quantityInputMobile: "[data-quantity-input-mobile]",
		quantityInputDesktop: "[data-quantity-input-desktop]",
		quantityLabelMobile: "[data-quantity-label-mobile]",
		quantityLabelDesktop: "[data-quantity-label-desktop]",
		inputQty: "[data-quantity-input]",
		thumbnails: ".cart__image",
		unitPrice: "[data-unit-price]",
		unitPriceBaseUnit: "[data-unit-price-base-unit]",
		unitPriceGroup: "[data-unit-price-group]",
		editCart: "[data-cart-edit]",
		termsConditions: "[data-terms-conditions]",
		updateCartPC: "[data-cart-preview-pc]",
		updateCartMB: "[data-cart-preview]"
	},
		e = {
			cartNoCookies: "cart--no-cookies",
			cartRemovedProduct: "cart__removed-product",
			hide: "hide",
			inputError: "input--error"
		},
		a = "data-cart-item-index",
		i = "data-cart-item-key",
		r = "data-cart-item-quantity",
		o = "data-cart-item-title",
		n = "data-cart-item-url",
		s = "data-quantity-item";
	theme.breakpoints = theme.breakpoints || {}, (isNaN(theme.breakpoints.medium) || void 0 === theme.breakpoints.medium) && (theme.breakpoints.medium = 768);
	var c = "(min-width: " + theme.breakpoints.medium + "px)";

	function d(a) {
		this.$container = $(a), this.$thumbnails = $(t.thumbnails, this.$container), this.ajaxEnabled = this.$container.data("ajax-enabled"), this.cookiesEnabled() || this.$container.addClass(e.cartNoCookies), this.$thumbnails.css("cursor", "pointer"), this.$container.on("click", t.thumbnails, this._handleThumbnailClick), this.$container.on("change", t.inputQty, $.debounce(500, this._handleInputQty.bind(this))), this.mql = window.matchMedia(c), this.mql.addListener(this.setQuantityFormControllers.bind(this)), this.setQuantityFormControllers(), this.ajaxEnabled && (this.$container.on("change", t.cartNote, this._onNoteChange.bind(this)), this.$container.on("click", t.cartRemove, this._onRemoveItem.bind(this)), this.$container.on("click", t.cartRemoveAll, this._onRemoveItemAll.bind(this)), this._setupCartTemplates()), this.$container.on("click", t.editCart, this._editCart.bind(this)), this._cartTermsConditions();
		var i = this;
		$(document).on("click", t.updateCartPC, function(t) {
			const e = $(t.currentTarget);
			$.getJSON(window.router + "/cart.js").then(function(t) {
				0 === t.item_count ? (i._emptyCart(), e.hasClass("is-open") ? (e.removeClass("is-open"), $("#cart-dropdown").slideUp()) : (e.addClass("is-open"), $(".cart-quickview_header--no-item").addClass("hide"), $("#cart-dropdown").slideDown())) : (i._createCart(t), theme.HaloAddOn.progressBarShipping(), e.hasClass("is-open") ? (e.removeClass("is-open"), $("#cart-dropdown").slideUp()) : (e.addClass("is-open"), $(".cart-quickview_header--no-item").removeClass("hide"), $(".cart-quickview_header").removeClass("hide"), $("#cart-dropdown").slideDown()))
			}.bind(this))
		}), $(document).on("click", t.updateCartMB, function(t) {
			$(t.currentTarget);
			$.getJSON(window.router + "/cart.js").then(function(t) {
				0 === t.item_count ? (i._emptyCart(), $("body").addClass("open_Cart")) : (i._createCart(t), theme.HaloAddOn.progressBarShipping(), $("body").addClass("open_Cart"))
			}.bind(this))
		}), $(document).on("click", function(t) {
			$("[data-cart-preview-pc]").hasClass("is-open") && 0 === $(t.target).closest("[data-cart-preview-pc]").length && 0 === $(t.target).closest("#cart-dropdown").length && 0 === $(t.target).closest("#cart-edit-modal").length && ($("[data-cart-preview-pc]").removeClass("is-open"), $("#cart-dropdown").slideUp())
		}), $(document).on("click", function(t) {
			$("body").hasClass("open_Cart") && 0 === $(t.target).closest("[data-cart-preview]").length && 0 === $(t.target).closest("#cart-mobile").length && 0 === $(t.target).closest("#cart-edit-modal").length && $("body").removeClass("open_Cart")
		}), $("[data-close-cart-preview]").on("click", function(t) {
			$("body").removeClass("open_Cart")
		})
	}
	return d.prototype = _.assignIn({}, d.prototype, {
		_showErrorMessage: function(t, e) {
			$("[data-error-message]", e).html(t), $("[data-error-message-wrapper]", e).removeClass("product-form__error-message-wrapper--hidden").attr("aria-hidden", !0).removeAttr("aria-hidden")
		},
		_hideErrorMessage: function(t) {
			$("[data-error-message-wrapper]", t).addClass("product-form__error-message-wrapper--hidden")
		},
		_editCart: function(t) {
			var e = $(t.currentTarget).parents("[data-cart-item]"),
				r = e.data("cart-item-url"),
				o = e.data("cart-item-quantity"),
				n = this;
			$.urlParam = function(t) {
				return new RegExp("[?&]" + t + "=([^&#]*)").exec(r)[1] || 0
			};
			var s = "#cart-edit-modal",
				c = ($(s).find(".close"), $(s).find(".cart-edit-modal")),
				d = $.urlParam("variant");
			$("[data-cart-edit-item-quantity] input", s).val(o);
			$.ajax({
				type: "GET",
				url: r,
				data: {
					view: "get_json"
				},
				cache: !1,
				dataType: "html",
				success: function(t) {
					window._json = JSON.parse(t), $("[data-product-vendor-edit]", c).text(window._json.vendor), $("[data-product-title-edit]", c).text(window._json.title);
					var r = 0,
						l = window._json.featured_image,
						p = "";
					$("[data-cart-edit-item-template] option", s).remove(), $.each(window._json.variants, function(t, e) {
						p = "", d == e.id && (r = t, p = 'selected="selected"', e.featured_image && (l = e.featured_image.src)), $("[data-cart-edit-item-template]", s).append("<option " + (e.available ? 'value="' + e.id + '" ' : 'disabled="disabled" ') + p + ">" + e.title + (e.available ? "" : " - Sold out") + "</option>")
					}), $("[data-product-image-edit] img", s).attr("src", l);
					var u = window._json.variants[r],
						h = "",
						m = [],
						f = [],
						v = [];
					$.each(window._json.options, function(t, e) {
						h += '<th class="text-center" scope="col" data-option> ' + e + " </th>", $.each(window._json.variants, function(e, a) {
							0 == t ? -1 === $.inArray(a.options[t], m) && m.push(a.options[t]) : 1 == t ? -1 === $.inArray(a.options[t], f) && f.push(a.options[t]) : -1 === $.inArray(a.options[t], v) && v.push(a.options[t])
						})
					}), $("[data-cart-edit-head] tr", s).find("[data-option]").remove(), $("[data-cart-edit-head] tr", s).prepend(h);
					var g = "";
					m.length && (g += '<td class="cart-edit__option text-center" data-cart-edit-item-option><select class="cart-edit-option-selector product-form__input form-control" id="CartEditOptionSelector-1" data-index="option1" data-option-index="1">', $.each(m, function(t, e) {
						p = "", u.option1 == e && (p = 'selected="selected"'), g += '<option value="' + e + '" ' + p + ">" + e + "</option>"
					}), g += "</select></td>"), f.length && (g += '<td class="cart-edit__option text-center" data-cart-edit-item-option><select class="cart-edit-option-selector product-form__input form-control" id="CartEditOptionSelector-2" data-index="option2" data-option-index="2">', $.each(f, function(t, e) {
						p = "", u.option2 == e && (p = 'selected="selected"'), g += '<option value="' + e + '" ' + p + ">" + e + "</option>"
					}), g += "</select></td>"), v.length && (g += '<td class="cart-edit__option text-center" data-cart-edit-item-option><select class="cart-edit-option-selector product-form__input form-control" id="CartEditOptionSelector-3" data-index="option3" data-option-index="3">', $.each(v, function(t, e) {
						p = "", u.option3 == e && (p = 'selected="selected"'), g += '<option value="' + e + '" ' + p + ">" + e + "</option>"
					}), g += "</select></td>");
					var b = $("[data-cart-edit-body] tr:eq(0)", s).clone();
					$("[data-cart-edit-body] tr", s).remove(), $("[data-cart-edit-body]", s).append(b), $("[data-cart-edit-body] tr", s).find("[data-cart-edit-item-option]").remove(), $("[data-cart-edit-body] tr", s).prepend(g), $("[data-cart-edit-body] tr", s).find("[data-cart-edit-remove]").hide(), m.length && n._updateVariant(window._json, s, u, u.option1, "option1"), n._updatePrice(u, s);
					var w = $("[data-cart-edit-item]:last-child", s).clone();
					$(document).off("change", ".cart-edit-option-selector").on("change", ".cart-edit-option-selector", function(t) {
						var e = $(t.currentTarget).parents("[data-cart-edit-item]"),
							a = _.map($(".cart-edit-option-selector", e), function(t) {
								var e = $(t),
									a = {};
								return a.value = e.val(), a.index = e.data("index"), a
							});
						a = _.compact(a);
						var i, r, o, s = window._json.variants,
							c = _.find(s, function(t) {
								return a.every(function(e) {
									return _.isEqual(t[e.index], e.value)
								})
							});
						c && ($("[data-cart-edit-item-template]", e).val(c.id), n._updatePrice(c, e)), null != c && 0 != c.available || (i = $("#CartEditOptionSelector-1", e).find("option:selected").val(), r = $("#CartEditOptionSelector-2", e).find("option:selected").val(), o = $("#CartEditOptionSelector-3", e).find("option:selected").val(), $("#CartEditOptionSelector-3 option", e).each(function() {
							var t = $(this).val();
							null == s.find(function(e) {
								return e.option1 == i && e.option2 == r && e.option3 == t && e.available
							}) ? $(this).attr("disabled", "disabled").prop("selected", !1) : $(this).removeAttr("disabled", "disabled").prop("selected", !0)
						}), a = _.map($(".cart-edit-option-selector", e), function(t) {
							var e = $(t),
								a = {};
							return a.value = e.val(), a.index = e.data("index"), a
						}), a = _.compact(a), (c = _.find(s, function(t) {
							return a.every(function(e) {
								return _.isEqual(t[e.index], e.value)
							})
						})) && ($("[data-cart-edit-item-template]", e).val(c.id), n._updatePrice(c, e)), null != c && 0 != c.available || ($("#CartEditOptionSelector-3 option", e).each(function() {
							var t = $(this).val();
							null == s.find(function(e) {
								return e.option1 == i && e.option3 == t && e.available
							}) ? $(this).attr("disabled", "disabled").prop("selected", !1) : $(this).removeAttr("disabled", "disabled").prop("selected", !0)
						}), o = $("#CartEditOptionSelector-3", e).find("option:selected").val(), $("#CartEditOptionSelector-2 option", e).each(function() {
							var t = $(this).val();
							null == s.find(function(e) {
								return e.option1 == i && e.option3 == o && e.option2 == t && e.available
							}) ? $(this).attr("disabled", "disabled").prop("selected", !1) : $(this).removeAttr("disabled", "disabled").prop("selected", !0)
						}), a = _.map($(".cart-edit-option-selector", e), function(t) {
							var e = $(t),
								a = {};
							return a.value = e.val(), a.index = e.data("index"), a
						}), a = _.compact(a), c = _.find(s, function(t) {
							return a.every(function(e) {
								return _.isEqual(t[e.index], e.value)
							})
						}), console.log(c), c && ($("[data-cart-edit-item-template]", e).val(c.id), n._updatePrice(c, e)))), n._updateVariant(window._json, e, c, $(t.currentTarget).val(), $(t.currentTarget).data("index"))
					}), $("form[data-edit-cart-form]", s).off("submit").on("submit", function(t) {
						t.preventDefault();
						var r = [];
						$("[data-cart-edit-item]", s).each(function(t, e) {
							var a = $("[data-cart-edit-item-template]", $(e)).val(),
								i = parseInt($("[data-cart-edit-item-quantity] input", $(e)).val()),
								o = {};
							o.value = a, o.qty = i;
							var n = 0;
							$.each(r, function(t, e) {
								a == e.value && (n = 1, i > e.qty && (e.qty = i))
							}), 0 == n && r.push(o)
						});
						var c = 0;
						if ($.each(r, function(t, e) {
							d == e.value && (c = 1)
						}), 0 == c) {
							e.attr(i);
							var l = {
								url: "/cart/change.js",
								data: {
									quantity: 0,
									line: parseInt(e.attr(a))
								},
								dataType: "json",
								async: !1
							};
							$.post(l).done(function(t) {}.bind(this))
						}
						return c = 0, $.each(r, function(t, a) {
							if (d == a.value) o != a.qty ? a.qty >= 0 && (n._updateItemQuantity(e.find("[data-quantity-input]").data("quantity-item"), e, $("[data-cart-edit-item-quantity] input", $("[data-cart-edit-body] tr:eq(0)", s)), a.qty), ++c == r.length && $.getJSON(window.router + "/cart.js").then(function(t) {
								n._setCartCountBubble(t.item_count), n._createCart(t), theme.HaloAddOn.progressBarShipping(), $("a.close", s).trigger("click")
							})) : ++c == r.length && $.getJSON(window.router + "/cart.js").then(function(t) {
								n._setCartCountBubble(t.item_count), n._createCart(t), theme.HaloAddOn.progressBarShipping(), $("a.close", s).trigger("click")
							});
							else if (a.qty > 0) {
								var i = {
									url: "/cart/add.js",
									data: "form_type=product&quantity=" + a.qty + "&utf8=✓&id=" + a.value,
									dataType: "json",
									async: !1
								};
								$.post(i).done(function(t) {
									n._hideErrorMessage(s), ++c == r.length && $.getJSON(window.router + "/cart.js").then(function(t) {
										n._setCartCountBubble(t.item_count), n._createCart(t), theme.HaloAddOn.progressBarShipping(), $("a.close", s).trigger("click")
									})
								}.bind(this)).fail(function(t) {
									var e = t.responseJSON ? t.responseJSON.description : theme.strings.cartError;
									n._showErrorMessage(e, s)
								}.bind(this))
							}
						}), !1
					}), $(document).off("click", "[data-cart-edit-remove]").on("click", "[data-cart-edit-remove]", function(t) {
						return t.preventDefault(), $(t.currentTarget).parents("[data-cart-edit-item]").remove(), !1
					}), $(".product-addmore-button", s).off("click").on("click", function(t) {
						var e = w.clone();
						e.find("[data-cart-edit-remove]").show(), $("[data-cart-edit-body]", s).append(e)
					}), theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
				},
				complete: function() {}
			})
		},
		_updateVariant: function(t, e, a, i, r) {
			var o = t.variants,
				n = $(".cart-edit-option-selector", e),
				s = $("#CartEditOptionSelector-1", e).find("option:selected").val(),
				c = $("#CartEditOptionSelector-2", e).find("option:selected").val();
			$("#CartEditOptionSelector-3", e).find("option:selected").val();
			n.each(function() {
				var t = $(this).data("option-index"),
					e = $(this).find("option");
				switch (t) {
				case 1:
					e.each(function() {
						var t = $(this).val();
						null == o.find(function(e) {
							return e.option1 == t && e.available
						}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
					});
					break;
				case 2:
					e.each(function() {
						var t = $(this).val();
						null == o.find(function(e) {
							return e.option1 == s && e.option2 == t && e.available
						}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
					});
					break;
				case 3:
					e.each(function() {
						var t = $(this).val();
						null == o.find(function(e) {
							return e.option1 == s && e.option2 == c && e.option3 == t && e.available
						}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
					})
				}
			})
		},
		_updatePrice: function(t, e) {
			var a = $("[data-price]", e),
				i = $("[data-regular-price]", a),
				r = $("[data-sale-price]", a),
				o = $("[data-unit-price]", a),
				n = $("[data-unit-price-base-unit]", a);
			if (a.removeClass("price--unavailable").removeClass("price--on-sale").removeClass("price--unit-available").removeAttr("aria-hidden"), t) {
				$("[data-cart-edit-item-quantity] input", e).val();
				t.compare_at_price > t.price ? (i.html(theme.Currency.formatMoney(t.compare_at_price, theme.moneyFormat)), r.html(theme.Currency.formatMoney(t.price, theme.moneyFormat)), a.addClass("price--on-sale")) : (i.html(theme.Currency.formatMoney(t.price, theme.moneyFormat)), r.html("")), t.unit_price && (o.html(theme.Currency.formatMoney(t.unit_price, theme.moneyFormat)), n.html(1 === t.unit_price_measurement.reference_value ? t.unit_price_measurement.reference_unit : t.unit_price_measurement.reference_value + t.unit_price_measurement.reference_unit), a.addClass("price--unit-available")), theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
			} else a.addClass("price--unavailable").attr("aria-hidden", !0)
		},
		_setupCartTemplates: function() {
			this.$itemTemplate = $(t.cartItem, this.$container).first().clone(), this.$itemDiscountTemplate = $(t.cartItemDiscount, this.$itemTemplate).clone(), this.$itemOptionTemplate = $(t.cartItemOption, this.$itemTemplate).clone(), this.$itemPropertyTemplate = $(t.cartItemProperty, this.$itemTemplate).clone(), this.$itemPriceListTemplate = $(t.cartItemPriceList, this.$itemTemplate).clone(), this.$itemLinePriceTemplate = $(t.cartItemLinePrice, this.$itemTemplate).clone(), this.$cartDiscountTemplate = $(t.cartDiscount, this.$container).clone(), theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
		},
		_handleInputQty: function(e) {
			var a = $(e.target),
				i = a.data("quantity-item"),
				r = a.closest(t.cartItem),
				o = $("[data-quantity-item=" + i + "]"),
				n = parseInt(a.val()),
				s = !(n < 0 || isNaN(n));
			o.val(n), this._hideCartError(), this._hideQuantityErrorMessage(), s ? s && this.ajaxEnabled && this._updateItemQuantity(i, r, o, n) : this._showQuantityErrorMessages(r)
		},
		_updateItemQuantity: function(e, r, o, n) {
			var s = r.attr(i),
				c = r.attr(a),
				d = {
					url: "/cart/change.js",
					data: {
						quantity: n,
						line: c
					},
					dataType: "json",
					async: !1
				};
			$.post(d).done(function(e) {
				if (0 === e.item_count) this._emptyCart();
				else if (this._createCart(e), 0 === n) this._showRemoveMessage(r.clone());
				else {
					var a = $('[data-cart-item-key="' + s + '"]'),
						i = this.getItem(s, e);
					n != i.quantity && this._showQuantityErrorMessages2(i.quantity, a), $(t.quantityInput, a).focus(), this._updateLiveRegion(i), theme.HaloAddOn.progressBarShipping()
				}
				this._setCartCountBubble(e.item_count)
			}.bind(this)).fail(function() {
				this._showCartError(o)
			}.bind(this))
		},
		getItem: function(t, e) {
			return e.items.find(function(e) {
				return e.key === t
			})
		},
		_liveRegionText: function(t) {
			var e = theme.strings.update + ": [QuantityLabel]: [Quantity], [Regular] [$$] [DiscountedPrice] [$]. [PriceInformation]";
			e = e.replace("[QuantityLabel]", theme.strings.quantity).replace("[Quantity]", t.quantity);
			var a = "",
				i = theme.Currency.formatMoney(t.original_line_price, theme.moneyFormat),
				r = "",
				o = "",
				n = "";
			return t.original_line_price > t.final_line_price && (a = theme.strings.regularTotal, r = theme.strings.discountedTotal, o = theme.Currency.formatMoney(t.final_line_price, theme.moneyFormat), n = theme.strings.priceColumn), e = e.replace("[Regular]", a).replace("[$$]", i).replace("[DiscountedPrice]", r).replace("[$]", o).replace("[PriceInformation]", n).trim()
		},
		_updateLiveRegion: function(e) {
			var a = $(t.cartStatus);
			a.html(this._liveRegionText(e)).attr("aria-hidden", !1), setTimeout(function() {
				a.attr("aria-hidden", !0)
			}, 1e3)
		},
		_createCart: function(a) {
			var i = this._createCartDiscountList(a);
			$(t.emptyPageContent).addClass(e.hide), $(t.cartWrapper).removeClass(e.hide), $(t.cartLineItems, this.$container).html(this._createLineItemList(a)), this.setQuantityFormControllers(), $(t.cartNote, this.$container).val(a.note), 0 === i.length ? $(t.cartDiscountWrapper, this.$container).html("").addClass(e.hide) : $(t.cartDiscountWrapper, this.$container).html(i).removeClass(e.hide), $(t.cartSubtotal, this.$container).html(theme.Currency.formatMoney(a.total_price, theme.moneyFormatWithCurrency)), theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
		},
		_createCartDiscountList: function(e) {
			return $.map(e.cart_level_discount_applications, function(e) {
				var a = this.$cartDiscountTemplate.clone();
				return a.find(t.cartDiscountTitle).text(e.title), a.find(t.cartDiscountAmount).html(theme.Currency.formatMoney(e.total_allocated_amount, theme.moneyFormat)), a[0]
			}.bind(this))
		},
		_createLineItemList: function(e) {
			return $.map(e.items, function(e, a) {
				var i = this.$itemTemplate.clone(),
					r = this.$itemPriceListTemplate.clone();
				this._setLineItemAttributes(i, e, a), this._setLineItemImage(i, e.featured_image), $(t.cartItemTitle, i).text(e.product_title).attr("href", e.url);
				var o = this._createProductDetailsList(e.product_has_only_default_variant, e.options_with_values, e.properties);
				this._setProductDetailsList(i, o), this._setItemRemove(i, e.title), r.html(this._createItemPrice(e.original_price, e.final_price, this.$itemPriceListTemplate)), e.unit_price_measurement && r.append(this._createUnitPrice(e.unit_price, e.unit_price_measurement, this.$itemPriceListTemplate)), this._setItemPrice(i, r);
				var n = this._createItemDiscountList(e);
				this._setItemDiscountList(i, n), this._setQuantityInputs(i, e, a);
				var s = this._createItemPrice(e.original_line_price, e.final_line_price, this.$itemLinePriceTemplate);
				return this._setItemLinePrice(i, s), i[0]
			}.bind(this))
		},
		_setLineItemAttributes: function(t, e, s) {
			t.attr(i, e.key).attr(n, e.url).attr(o, e.title).attr(a, s + 1).attr(r, e.quantity)
		},
		_setLineItemImage: function(a, i) {
			var r = $(t.cartItemImage, a),
				o = null !== i.url ? theme.Images.getSizedImageUrl(i.url, "x190") : null;
			o ? r.attr("alt", i.alt).attr("src", o).removeClass(e.hide) : r.remove()
		},
		_setProductDetailsList: function(a, i) {
			var r = $(t.cartItemDetails, a);
			0 === i.length ? r.addClass(e.hide).text("") : r.removeClass(e.hide).html(i)
		},
		_setItemPrice: function(e, a) {
			$(t.cartItemPrice, e).html(a)
		},
		_setItemDiscountList: function(a, i) {
			var r = $(t.cartItemDiscountList, a);
			0 === i.length ? r.html("").addClass(e.hide) : r.html(i).removeClass(e.hide)
		},
		_setItemRemove: function(e, a) {
			$(t.cartRemove, e).attr("aria-label", theme.strings.removeLabel.replace("[product]", a))
		},
		_setQuantityInputs: function(e, a, i) {
			$(t.quantityInputMobile, e).attr("id", "updates_" + a.key).attr(s, i + 1).val(a.quantity), $(t.quantityInputDesktop, e).attr("id", "updates_large_" + a.key).attr(s, i + 1).val(a.quantity), $(t.quantityLabelMobile, e).attr("for", "updates_" + a.key), $(t.quantityLabelDesktop, e).attr("for", "updates_large_" + a.key)
		},
		setQuantityFormControllers: function() {
			this.mql.matches ? ($(t.quantityInputDesktop).attr("name", "updates[]"), $(t.quantityInputMobile).removeAttr("name")) : ($(t.quantityInputMobile).attr("name", "updates[]"), $(t.quantityInputDesktop).removeAttr("name"))
		},
		_setItemLinePrice: function(e, a) {
			$(t.cartItemLinePrice, e).html(a)
		},
		_createProductDetailsList: function(t, e, a) {
			var i = [];
			return t || (i = i.concat(this._getOptionList(e))), null !== a && 0 !== Object.keys(a).length && (i = i.concat(this._getPropertyList(a))), i
		},
		_getOptionList: function(t) {
			return $.map(t, function(t) {
				var a = this.$itemOptionTemplate.clone();
				return a.text(t.value).removeClass(e.hide), a[0]
			}.bind(this))
		},
		_getPropertyList: function(a) {
			var i = null !== a ? Object.entries(a) : [];
			return $.map(i, function(a) {
				var i = this.$itemPropertyTemplate.clone();
				if ("_" !== a[0].charAt(0) && 0 !== a[1].length) return i.find(t.cartItemPropertyName).text(a[0]), -1 === a[0].indexOf("/uploads/") ? i.find(t.cartItemPropertyValue).text(": " + a[1]) : i.find(t.cartItemPropertyValue).html(': <a href="' + a[1] + '"> ' + a[1].split("/").pop() + "</a>"), i.removeClass(e.hide), i[0]
			}.bind(this))
		},
		_createItemPrice: function(a, i, r) {
			if (a !== i) {
				var o = $(t.cartItemDiscountedPriceGroup, r).clone();
				return $(t.cartItemOriginalPrice, o).html(theme.Currency.formatMoney(a, theme.moneyFormat)), $(t.cartItemFinalPrice, o).html(theme.Currency.formatMoney(i, theme.moneyFormat)), o.removeClass(e.hide), o[0]
			}
			var n = $(t.cartItemRegularPriceGroup, r).clone();
			return $(t.cartItemRegularPrice, n).html(theme.Currency.formatMoney(a, theme.moneyFormat)), n.removeClass(e.hide), n[0]
		},
		_createUnitPrice: function(a, i, r) {
			var o = $(t.unitPriceGroup, r).clone(),
				n = (1 !== i.reference_value ? i.reference_value : "") + i.reference_unit;
			return $(t.unitPriceBaseUnit, o).text(n), $(t.unitPrice, o).html(theme.Currency.formatMoney(a, theme.moneyFormat)), o.removeClass(e.hide), o[0]
		},
		_createItemDiscountList: function(e) {
			return $.map(e.line_level_discount_allocations, function(e) {
				var a = this.$itemDiscountTemplate.clone();
				return a.find(t.cartItemDiscountTitle).text(e.discount_application.title), a.find(t.cartItemDiscountAmount).html(theme.Currency.formatMoney(e.amount, theme.moneyFormat)), a[0]
			}.bind(this))
		},
		_showQuantityErrorMessages: function(a) {
			$(t.cartQuantityErrorMessage, a).text(theme.strings.quantityMinimumMessage), $(t.cartQuantityErrorMessageWrapper, a).removeClass(e.hide), $(t.inputQty, a).addClass(e.inputError).focus()
		},
		_showQuantityErrorMessages2: function(a, i) {
			$(t.cartQuantityErrorMessage, i).text(theme.strings.cartErrorMaximum.replace("[quantity]", a)), $(t.cartQuantityErrorMessageWrapper, i).removeClass(e.hide), $(t.inputQty, i).addClass(e.inputError).focus()
		},
		_hideQuantityErrorMessage: function() {
			var a = $(t.cartQuantityErrorMessageWrapper).addClass(e.hide);
			$(t.cartQuantityErrorMessage, a).text(""), $(t.inputQty, this.$container).removeClass(e.inputError)
		},
		_handleThumbnailClick: function(e) {
			var a = $(e.target).closest(t.cartItem).data("cart-item-url");
			window.location.href = a
		},
		_onNoteChange: function(t) {
			var e = t.currentTarget.value;
			this._hideCartError(), this._hideQuantityErrorMessage();
			var a = {
				url: "/cart/update.js",
				data: {
					note: e
				},
				dataType: "json"
			};
			$.post(a).fail(function() {
				this._showCartError(t.currentTarget)
			}.bind(this))
		},
		_showCartError: function(a) {
			$(t.cartErrorMessage).text(theme.strings.cartError), $(t.cartErrorMessageWrapper).removeClass(e.hide), a.focus()
		},
		_hideCartError: function() {
			$(t.cartErrorMessageWrapper).addClass(e.hide), $(t.cartErrorMessage).text("")
		},
		_onRemoveItem: function(e) {
			e.preventDefault();
			var i = $(e.target).closest(t.cartItem),
				r = i.attr(a);
			this._hideCartError();
			var o = {
				url: "/cart/change.js",
				data: {
					quantity: 0,
					line: r
				},
				dataType: "json"
			};
			$.post(o).done(function(t) {
				0 === t.item_count ? ($(".cart-quickview_header").addClass("hide"), this._emptyCart()) : (this._createCart(t), this._showRemoveMessage(i.clone()), theme.HaloAddOn.progressBarShipping()), this._setCartCountBubble(t.item_count)
			}.bind(this)).fail(function() {
				this._showCartError(null)
			}.bind(this))
		},
		_onRemoveItemAll: function(t) {
			t.preventDefault(), this._hideCartError();
			$.post({
				url: "/cart/clear.js",
				dataType: "json"
			}).done(function() {
				this._setCartCountBubble(0), this._emptyCart()
			}.bind(this)).fail(function() {
				this._showCartError(null)
			}.bind(this))
		},
		_showRemoveMessage: function(t) {
			var e, a = t.data("cart-item-index"),
				i = this._getRemoveMessage(t);
			a - 1 == 0 ? (e = $('[data-cart-item-index="1"]', this.$container), $(i).insertBefore(e)) : (e = $('[data-cart-item-index="' + (a - 1) + '"]', this.$container), i.insertAfter(e)), i.focus()
		},
		_getRemoveMessage: function(a) {
			var i = this._formatRemoveMessage(a),
				r = $(t.cartTableCell, a).clone();
			return r.removeClass().addClass(e.cartRemovedProduct).attr("colspan", "4").html(i), a.attr("role", "alert").html(r).attr("tabindex", "-1"), a
		},
		_formatRemoveMessage: function(t) {
			var e = t.data("cart-item-quantity"),
				a = t.attr(n),
				i = t.attr(o);
			return theme.strings.removedItemMessage.replace("[quantity]", e).replace("[link]", '<a href="' + a + '" class="text-link text-link--accent">' + i + "</a>")
		},
		_setCartCountBubble: function(a) {
			this.$cartCountBubble = this.$cartCountBubble || $(t.cartCountBubble), this.$cartCount = this.$cartCount || $(t.cartCount), a > 0 ? (this.$cartCountBubble.removeClass(e.hide), this.$cartCount.html(a)) : (this.$cartCountBubble.addClass(e.hide), this.$cartCount.html("0"))
		},
		_emptyCart: function() {
			this.$emptyPageContent = this.$emptyPageContent || $(t.emptyPageContent, this.$container), this.$cartWrapper = this.$cartWrapper || $(t.cartWrapper, this.$container), $(t.emptyPageContent).removeClass(e.hide), $(t.cartWrapper).addClass(e.hide)
		},
		_cartTermsConditions: function() {
			$(".cart__submit-controls .product__terms-conditions").length && ($('.cart__submit-controls .product__terms-conditions input[type="checkbox"]').each(function() {
				$(this).prop("checked") ? $(this).parent().prev().removeClass("disabled") : $(this).parent().prev().addClass("disabled")
			}), $(document).on("click", ".cart__submit-controls .product__terms-conditions .title", function(t) {
				t.preventDefault();
				var e = $(this),
					a = e.prev();
				a.prop("checked") ? (a.prop("checked", !1), e.parent().prev().addClass("disabled")) : (a.prop("checked", !0), e.parent().prev().removeClass("disabled"))
			}))
		},
		cookiesEnabled: function() {
			var t = navigator.cookieEnabled;
			return t || (document.cookie = "testcookie", t = -1 !== document.cookie.indexOf("testcookie")), t
		}
	}), d
}(), window.theme = window.theme || {}, theme.Filters = function() {
	var t = "screen and (min-width: 750px)",
		e = "sort_by",
		a = {
			mainContent: "#MainContent",
			filterSelection: "#FilterTags",
			sortSelection: "#SortBy",
			pagination: "#showPagination"
		},
		i = "data-default-sortby";

	function r(t) {
		var e = this.$container = $(t);
		this.$pagination = $(a.pagination, e), this.$filterSelect = $(a.filterSelection, e), this.$sortSelect = $(a.sortSelection, e), this.$selects = $(a.pagination, e).add($(a.sortSelection, e)), this.defaultSort = this._getDefaultSortValue(), this.$selects.removeClass("hidden"), this.$pagination.on("change", this._onPaginationChange.bind(this)), this._initBreakpoints()
	}
	return r.prototype = _.assignIn({}, r.prototype, {
		_initBreakpoints: function() {
			var e = this;
			enquire.register(t, {
				match: function() {
					e._resizeSelect(e.$selects)
				}
			})
		},
		_onPaginationChange: function() {
			var t = this._getPaginationValue();
			$.ajax({
				type: "Post",
				url: window.router + "/cart.js",
				data: {
					"attributes[pagination]": t
				},
				success: function(t) {
					window.location.reload()
				},
				dataType: "json"
			})
		},
		_getPaginationValue: function() {
			return this.$pagination.val()
		},
		_onSortChange: function() {
			var t = this._sortValue(),
				e = window.location.href.replace(window.location.search, ""),
				i = slate.utils.getParameterByName("q"),
				r = null !== i ? i : "";
			if (t.length) {
				var o = e.replace(window.location.hash, "");
				r = "" !== r ? "?q=" + r + "&" : "?", window.location.href = o + r + t + a.mainContent
			} else window.location.href = e
		},
		_onFilterChange: function() {
			var t = this._getFilterValue(),
				e = document.location.search.replace(/\?(page=\w+)?&?/, "");
			e = "" !== e ? "?" + e : "", document.location.href = t + e + a.mainContent
		},
		_getFilterValue: function() {
			return this.$filterSelect.val()
		},
		_getSortValue: function() {
			return this.$sortSelect.val() || this.defaultSort
		},
		_getDefaultSortValue: function() {
			return this.$sortSelect.attr(i)
		},
		_sortValue: function() {
			var t = this._getSortValue(),
				a = "";
			return t !== this.defaultSort && (a = e + "=" + t), a
		},
		_resizeSelect: function(t) {
			t.each(function() {
				var t = $(this).find("option:selected").text(),
					e = $("<span>").html(t);
				e.appendTo("body");
				e.width();
				e.remove()
			})
		},
		onUnload: function() {
			this.$sortSelect.off("change", this._onSortChange)
		}
	}), r
}(), theme.Maps = function() {
	var t = 14,
		e = null,
		a = [],
		i = {
			addressNoResults: theme.strings.addressNoResults,
			addressQueryLimit: theme.strings.addressQueryLimit,
			addressError: theme.strings.addressError,
			authError: theme.strings.authError
		},
		r = {
			section: '[data-section-type="map"]',
			map: "[data-map]",
			mapOverlay: "[data-map-overlay]"
		},
		o = "map-section--load-error",
		n = "map-section__error errors text-center";

	function s(t) {
		this.$container = $(t), this.$map = this.$container.find(r.map), this.key = this.$map.data("api-key"), void 0 !== this.key && ("loaded" === e ? this.createMap() : (a.push(this), "loading" !== e && (e = "loading", void 0 === window.google && $.getScript("https://maps.googleapis.com/maps/api/js?key=" + this.key).then(function() {
			e = "loaded", $.each(a, function(t, e) {
				e.createMap()
			})
		}))))
	}
	return window.gm_authFailure = function() {
		Shopify.designMode && ($(r.section).addClass(o), $(r.map).remove(), $(r.mapOverlay).after('<div class="' + n + '">' + theme.strings.authError + "</div>"))
	}, s.prototype = _.assignIn({}, s.prototype, {
		createMap: function() {
			var e = this.$map;
			return function(t) {
				var e = $.Deferred(),
					a = new google.maps.Geocoder,
					i = t.data("address-setting");
				return a.geocode({
					address: i
				}, function(t, a) {
					a !== google.maps.GeocoderStatus.OK && e.reject(a), e.resolve(t)
				}), e
			}(e).then(function(a) {
				var i = {
					zoom: t,
					center: a[0].geometry.location,
					draggable: !1,
					clickableIcons: !1,
					scrollwheel: !1,
					disableDoubleClickZoom: !0,
					disableDefaultUI: !0
				},
					r = this.map = new google.maps.Map(e[0], i),
					o = this.center = r.getCenter();
				new google.maps.Marker({
					map: r,
					position: r.getCenter()
				});
				google.maps.event.addDomListener(window, "resize", $.debounce(250, function() {
					google.maps.event.trigger(r, "resize"), r.setCenter(o), e.removeAttr("style")
				}))
			}.bind(this)).fail(function() {
				var t;
				switch (status) {
				case "ZERO_RESULTS":
					t = i.addressNoResults;
					break;
				case "OVER_QUERY_LIMIT":
					t = i.addressQueryLimit;
					break;
				case "REQUEST_DENIED":
					t = i.authError;
					break;
				default:
					t = i.addressError
				}
				Shopify.designMode && e.parent().addClass(o).html('<div class="' + n + '">' + t + "</div>")
			})
		},
		onUnload: function() {
			0 !== this.$map.length && google.maps.event.clearListeners(this.map, "resize")
		}
	}), s
}(), theme.Product = function() {
	function t(t) {
		var e = this.$container = $(t),
			a = e.attr("data-section-id");
		this.settings = {
			mediaQueryMediumUp: "screen and (min-width: 1025px)",
			mediaQuerySmall: "screen and (max-width: 1024px)",
			bpSmall: !1,
			enableHistoryState: e.data("enable-history-state") || !1,
			namespace: ".slideshow-" + a,
			sectionId: a,
			sliderActive: !1,
			zoomEnabled: !1
		}, this.selectors = {
			addToCart: "[data-add-to-cart]",
			addToCartText: "[data-add-to-cart-text]",
			cartCount: "[data-cart-count]",
			cartCountBubble: "[data-cart-count-bubble]",
			cartPopup: "[data-cart-popup]",
			cartPopupCartQuantity: "[data-cart-popup-cart-quantity]",
			cartPopupClose: "[data-cart-popup-close]",
			cartPopupDismiss: "[data-cart-popup-dismiss]",
			cartPopupImage: "[data-cart-popup-image]",
			cartPopupImageWrapper: "[data-cart-popup-image-wrapper]",
			cartPopupImagePlaceholder: "[data-cart-popup-image-placeholder]",
			cartPopupProductDetails: "[data-cart-popup-product-details]",
			cartPopupQuantity: "[data-cart-popup-quantity]",
			cartPopupQuantityLabel: "[data-cart-popup-quantity-label]",
			cartPopupTitle: "[data-cart-popup-title]",
			cartPopupWrapper: "[data-cart-popup-wrapper]",
			loader: "[data-loader]",
			loaderStatus: "[data-loader-status]",
			quantity: "[data-quantity-input]",
			quantitybtn: "[data-qtt]",
			SKU: ".variant-sku",
			productStatus: "[data-product-status]",
			originalSelectorId: "#ProductSelect-" + a,
			productForm: "[data-product-form]",
			errorMessage: "[data-error-message]",
			errorMessageWrapper: "[data-error-message-wrapper]",
			productImage: ".product-single__photo img",
			productImageWraps: ".product-single__photo",
			productMainImageWraps: ".product-single__photo.number__1",
			productThumbImages: ".product-single__thumbnail--" + a,
			productThumbs: ".product-single__thumbnails-" + a,
			productThumbListItem: ".product-single__thumbnails-item",
			productFeaturedImage: ".product-featured-img",
			productThumbsWrapper: ".thumbnails-wrapper",
			saleLabel: ".product-price__sale-label-" + a,
			singleOptionSelector: ".single-option-selector-" + a,
			shopifyPaymentButton: ".shopify-payment-button",
			priceContainer: "[data-price]",
			regularPrice: "[data-regular-price]",
			salePrice: "[data-sale-price]",
			unitPrice: "[data-unit-price]",
			labelSale: "[data-label-sale]",
			totalPrice: "[data-total-price]",
			productChangeGroupImage: "[data-change-group-image]",
			productSwatch: "[data-filter]",
			unitPriceBaseUnit: "[data-unit-price-base-unit]"
		}, this.classes = {
			cartPopupWrapperHidden: "cart-popup-wrapper--hidden",
			hidden: "hide",
			inputError: "input--error",
			productOnSale: "price--on-sale",
			productUnitAvailable: "price--unit-available",
			productUnavailable: "price--unavailable",
			productFormErrorMessageWrapperHidden: "product-form__error-message-wrapper--hidden",
			activeClass: "active-thumb"
		}, this.$quantityInput = $(this.selectors.quantity, e), this.$errorMessageWrapper = $(this.selectors.errorMessageWrapper, e), this.$addToCart = $(this.selectors.addToCart, e), this.$addToCartText = $(this.selectors.addToCartText, this.$addToCart), this.$loader = $(this.selectors.loader, this.$addToCart), this.$loaderStatus = $(this.selectors.loaderStatus, e), this.$shopifyPaymentButton = $(this.selectors.shopifyPaymentButton, e), $("#ProductJson-" + a).html() && (this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + a).innerHTML), this.settings.zoomEnabled = $(this.selectors.productImageWraps).hasClass("js-zoom-enabled"), this._initBreakpoints(), this._stringOverrides(), this._initVariants(), this._initImageSwitch(), this._initAddToCart(), this._initsetMainImage(), this._setActiveThumbnail(), this._next_prev_button(), this._setNumberQuantity(), this._setProductCarousel(), this._initSoldOutProductShop(), this._setShowmore_description(), this._initCustomerViewProductShop(), this._initCountdown(), this._scrollToReview(), this._productVideo())
	}
	function e() {
		return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency
	}
	function a(t) {
		return t < 10 ? "<span class='num'>0</span><span class='num'>" + t + "</span>" : "<span class='num'>" + parseInt(t / 10) + "</span><span class='num'>" + t % 10 + "</span>"
	}
	return t.prototype = _.assignIn({}, t.prototype, {
		_productVideo: function() {
			if ($("#video_product.halo_modal").length) {
				var t = $("#video_product .popup-video").children("iframe").attr("src");
				$("#video_product").on("click", function() {
					0 === $(event.target).closest("#video_product .popup-video").length && $("#video_product .popup-video").children("iframe").attr("src", "")
				}), $('.video-link[data-target="#video_product"]').on("click", function() {
					$("#video_product .popup-video").children("iframe").attr("src", t)
				})
			}
		},
		_stringOverrides: function() {
			theme.productStrings = theme.productStrings || {}, $.extend(theme.strings, theme.productStrings)
		},
		_initBreakpoints: function() {
			var t = this;
			enquire.register(this.settings.mediaQuerySmall, {
				match: function() {
					t.settings.zoomEnabled && $(t.selectors.productImageWraps).each(function() {
						$(this).trigger("zoom.destroy")
					}), t.settings.bpSmall = !0
				},
				unmatch: function() {
					t.settings.bpSmall = !1
				}
			}), enquire.register(this.settings.mediaQueryMediumUp, {
				match: function() {
					t.settings.zoomEnabled && $(t.selectors.productImageWraps).each(function() {
						var t, e;
						t = this, e = $(t).data("zoom"), $(t).zoom({
							url: e,
							magnify: 1.5
						})
					})
				}
			})
		},
		_initVariants: function() {
			var t = {
				$container: this.$container,
				enableHistoryState: this.$container.data("enable-history-state") || !1,
				singleOptionSelector: this.selectors.singleOptionSelector,
				originalSelectorId: this.selectors.originalSelectorId,
				product: this.productSingleObject
			};
			this.variants = new slate.Variants(t);
			var e = this.variants._getVariantFromOptions();
			if (null != e && null != e.featured_media) {
				var a = e.featured_media.id;
				this._switchImage(a), this._setActiveThumbnail(a)
			}
			this.$container.on("variantChange" + this.settings.namespace, this._updateAvailability.bind(this)), this.$container.on("variantImageChange" + this.settings.namespace, this._updateImages.bind(this)), this.$container.on("variantPriceChange" + this.settings.namespace, this._updatePrice.bind(this)), this.$container.on("variantSKUChange" + this.settings.namespace, this._updateSKU.bind(this))
		},
		_initsetMainImage: function() {
			if ($(".product-slider").hasClass("custom")) {
				var t = $(this.selectors.productMainImageWraps, this.$container),
					e = $(this.selectors.productImageWraps, this.$container);
				$(".product-slider").hasClass("custom") && (e.addClass(this.classes.hidden), t.removeClass(this.classes.hidden))
			}
		},
		_initImageSwitch: function() {
			if ($(this.selectors.productThumbImages).length) {
				var t = this;
				$(this.selectors.productThumbImages).on("click", function(e) {
					e.preventDefault();
					var a = $(this).data("thumbnail-id");
					t._switchImage(a), t._setActiveThumbnail(a)
				}).on("keyup", t._handleImageFocus.bind(t))
			}
		},
		_initAddToCart: function() {
			$(this.selectors.productForm, this.$container).on("submit", function(t) {
				t.preventDefault(), this.$previouslyFocusedElement = $(":focus");
				var e = this.$quantityInput.val() <= 0;
				if (!this.$addToCart.is("[aria-disabled]")) if (e) this._showErrorMessage(theme.strings.quantityMinimumMessage);
				else {
					this._handleButtonLoadingState(!0);
					var a = $(this.selectors.productForm, this.$container);
					this._addItemToCart(a)
				}
			}.bind(this))
		},
		_addItemToCart: function(t) {
			var e = {
				url: "/cart/add.js",
				data: $(t).serialize(),
				dataType: "json"
			};
			$.post(e).done(function(t) {
				this._hideErrorMessage(), this._setupCartPopup(t), this._updateTotalPrice()
			}.bind(this)).fail(function(t) {
				this.$previouslyFocusedElement.focus(), this._showErrorMessage(t.responseJSON.description), this._handleButtonLoadingState(!1)
			}.bind(this))
		},
		_handleButtonLoadingState: function(t) {
			t ? (this.$addToCart.attr("aria-disabled", !0), this.$addToCartText.addClass(this.classes.hidden), this.$loader.removeClass(this.classes.hidden), this.$shopifyPaymentButton.attr("disabled", !0), this.$loaderStatus.attr("aria-hidden", !1)) : (this.$addToCart.removeAttr("aria-disabled"), this.$addToCartText.removeClass(this.classes.hidden), this.$loader.addClass(this.classes.hidden), this.$shopifyPaymentButton.removeAttr("disabled"), this.$loaderStatus.attr("aria-hidden", !0))
		},
		_showErrorMessage: function(t) {
			$(this.selectors.errorMessage, this.$container).html(t), 0 !== this.$quantityInput.length && this.$quantityInput.addClass(this.classes.inputError), this.$errorMessageWrapper.removeClass(this.classes.productFormErrorMessageWrapperHidden).attr("aria-hidden", !0).removeAttr("aria-hidden")
		},
		_hideErrorMessage: function() {
			this.$errorMessageWrapper.addClass(this.classes.productFormErrorMessageWrapperHidden), 0 !== this.$quantityInput.length && this.$quantityInput.removeClass(this.classes.inputError)
		},
		_updateTotalPrice: function() {
			$(".navUser-action-total-price").length && Shopify.getCart(function(t) {
				$(".navUser-action-total-price .total-price").html(theme.Currency.formatMoney(t.total_price, theme.moneyFormat))
			})
		},
		_setupCartPopup: function(t) {
			this.$cartPopup = this.$cartPopup || $(this.selectors.cartPopup), this.$cartPopupWrapper = this.$cartPopupWrapper || $(this.selectors.cartPopupWrapper), this.$cartPopupTitle = this.$cartPopupTitle || $(this.selectors.cartPopupTitle), this.$cartPopupQuantity = this.$cartPopupQuantity || $(this.selectors.cartPopupQuantity), this.$cartPopupQuantityLabel = this.$cartPopupQuantityLabel || $(this.selectors.cartPopupQuantityLabel), this.$cartPopupClose = this.$cartPopupClose || $(this.selectors.cartPopupClose), this.$cartPopupDismiss = this.cartPopupDismiss || $(this.selectors.cartPopupDismiss), this._setupCartPopupEventListeners(), this._updateCartPopupContent(t)
		},
		_updateCartPopupContent: function(t) {
			var e = this.$quantityInput.length ? this.$quantityInput.val() : 1;
			this.$cartPopupTitle.text(t.product_title), this.$cartPopupQuantity.text(e), this.$cartPopupQuantityLabel.text(theme.strings.quantityLabel.replace("[count]", e)), this._setCartPopupImage(t.image, t.title), this._setCartPopupProductDetails(t.variant_options, t.properties), $.getJSON("/cart.js").then(function(t) {
				this._setCartQuantity(t.item_count), this._setCartCountBubble(t.item_count), this._showCartPopup()
			}.bind(this)), setTimeout(function() {
				$(this.selectors.cartPopupDismiss).trigger("click")
			}, 2e3)
		},
		_setupCartPopupEventListeners: function() {
			this.$cartPopupWrapper.on("keyup", function(t) {
				t.keyCode === slate.utils.keyboardKeys.ESCAPE && this._hideCartPopup(t)
			}.bind(this)), this.$cartPopupClose.on("click", this._hideCartPopup.bind(this)), this.$cartPopupDismiss.on("click", this._hideCartPopup.bind(this)), $("body").on("click", this._onBodyClick.bind(this))
		},
		_setCartPopupImage: function(t, e) {
			if (this.$cartPopupImageWrapper = this.$cartPopupImageWrapper || $(this.selectors.cartPopupImageWrapper), this.$cartPopupImagePlaceholder = this.$cartPopupImagePlaceholder || $(this.selectors.cartPopupImagePlaceholder), null !== t) {
				this.$cartPopupImageWrapper.removeClass(this.classes.hidden);
				var a = theme.Images.getSizedImageUrl(t, "200x"),
					i = document.createElement("img");
				i.src = a, i.alt = e, i.dataset.cartPopupImage = "", i.onload = function() {
					this.$cartPopupImagePlaceholder.addClass(this.classes.hidden), this.$cartPopupImageWrapper.append(i)
				}.bind(this)
			} else this.$cartPopupImageWrapper.addClass(this.classes.hidden)
		},
		_setCartPopupProductDetails: function(t, e) {
			this.$cartPopupProductDetails = this.$cartPopupProductDetails || $(this.selectors.cartPopupProductDetails);
			var a = "";
			"Default Title" !== t[0] && (a += this._getVariantOptionList(t)), null !== e && 0 !== Object.keys(e).length && (a += this._getPropertyList(e)), 0 === a.length ? (this.$cartPopupProductDetails.html(""), this.$cartPopupProductDetails.attr("hidden", "")) : (this.$cartPopupProductDetails.html(a), this.$cartPopupProductDetails.removeAttr("hidden"))
		},
		_getVariantOptionList: function(t) {
			var e = "";
			return t.forEach(function(t) {
				e = e + '<li class="product-details__item product-details__item--variant-option">' + t + "</li>"
			}), e
		},
		_getPropertyList: function(t) {
			var e = "";
			return Object.entries(t).forEach(function(t) {
				"_" !== t[0].charAt(0) && 0 !== t[1].length && (e = e + '<li class="product-details__item product-details__item--property"><span class="product-details__property-label">' + t[0] + ": </span>" + t[1])
			}), e
		},
		_setCartQuantity: function(t) {
			var e;
			this.$cartPopupCartQuantity = this.$cartPopupCartQuantity || $(this.selectors.cartPopupCartQuantity), 1 === t ? e = theme.strings.oneCartCount : t > 1 && (e = theme.strings.otherCartCount.replace("[count]", t)), this.$cartPopupCartQuantity.text(t).attr("aria-label", e)
		},
		_setNumberQuantity: function() {
			if ($(".template-product").length) {
				$("[data-qtt]");
				$(document).on("click", "[data-qtt]", function(t) {
					t.preventDefault(), t.stopPropagation();
					var a = $(this),
						i = $("#ProductSection-product-template [data-quantity-input]"),
						r = parseInt(i.val()),
						o = 1;
                                          console.log(i);
					switch (!0) {
					case a.hasClass("plus"):
						o = r + 1;
						break;
					case a.hasClass("minus") && r > 1:
						o = r - 1
					}
					i.val(o).trigger("change");
					var n = $("[data-total-price]"),
						s = $("[data-total-price]").attr("data-price-value");
					n.html(theme.Currency.formatMoney(s * o, theme.moneyFormat)), e() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
				})
			}
		},
		_setCartCountBubble: function(t) {
			this.$cartCountBubble = this.$cartCountBubble || $(this.selectors.cartCountBubble), this.$cartCount = this.$cartCount || $(this.selectors.cartCount), this.$cartCountBubble.removeClass(this.classes.hidden), this.$cartCount.text(t)
		},
		_showCartPopup: function() {
			this.$cartPopupWrapper.prepareTransition().removeClass(this.classes.cartPopupWrapperHidden), this._handleButtonLoadingState(!1), slate.a11y.trapFocus({
				$container: this.$cartPopupWrapper,
				$elementToFocus: this.$cartPopup,
				namespace: "cartPopupFocus"
			})
		},
		_hideCartPopup: function(t) {
			var e = 0 === t.detail;
			this.$cartPopupWrapper.prepareTransition().addClass(this.classes.cartPopupWrapperHidden), $(".cart-popup-wrapper").hasClass("cart-popup-wrapper--hidden") && $(".cart-popup-wrapper").removeClass("is-transitioning"), $(this.selectors.cartPopupImage).remove(), this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden), slate.a11y.removeTrapFocus({
				$container: this.$cartPopupWrapper,
				namespace: "cartPopupFocus"
			}), e && this.$previouslyFocusedElement[0].focus(), this.$cartPopupWrapper.off("keyup"), this.$cartPopupClose.off("click"), this.$cartPopupDismiss.off("click"), $("body").off("click")
		},
		_onBodyClick: function(t) {
			var e = $(t.target);
			e[0] === this.$cartPopupWrapper[0] || e.parents(this.selectors.cartPopup).length || this._hideCartPopup(t)
		},
		_setActiveThumbnail: function(t) {
			void 0 === t && (t = $(this.selectors.productImageWraps + ":not(.hide)", this.$container).data("image-id"));
			var e = $(this.selectors.productThumbListItem + ":not(.slick-cloned)", this.$container),
				a = e.find(this.selectors.productThumbImages + "[data-thumbnail-id='" + t + "']");
			if ($(this.selectors.productThumbImages).removeClass(this.classes.activeClass).removeAttr("aria-current"), a.addClass(this.classes.activeClass), a.attr("aria-current", !0), e.hasClass("slick-slide")) {
				var i = a.parent().data("slick-index");
				$(this.selectors.productThumbs).slick("slickGoTo", i)
			}
		},
		_next_prev_button: function() {
			if (!$(".product-slider").hasClass("custom")) {
				var t = $(this.selectors.productThumbs).find(".slick-arrow"),
					e = $(this.selectors.productThumbImages);
				$(document).on("click", t, function() {
					var t = $(".product-single__thumbnails").find(".slick-current");
					e.removeClass("active-thumb").removeAttr("aria-current"), t.children().addClass("active-thumb"), t.children().attr("aria-current", !0)
				})
			}
		},
		_switchImage: function(t) {
			$(this.selectors.productImageWraps + "[data-image-id='" + t + "']", this.$container), $(this.selectors.productImageWraps + ":not([data-image-id='" + t + "'])", this.$container)
		},
		_handleImageFocus: function(t) {
			t.keyCode === slate.utils.keyboardKeys.ENTER && $(this.selectors.productFeaturedImage + ":visible").focus()
		},
		_liveRegionText: function(t) {
			var e = "[Availability] [Regular] [$$] [Sale] [$]. [UnitPrice] [$$$]";
			if (!t) return e = theme.strings.unavailable;
			var a = t.available ? "" : theme.strings.soldOut + ",";
			e = e.replace("[Availability]", a);
			var i = "",
				r = theme.Currency.formatMoney(t.price, theme.moneyFormat),
				o = "",
				n = "",
				s = "",
				c = "";
			return t.compare_at_price > t.price && (i = theme.strings.regularPrice, r = theme.Currency.formatMoney(t.compare_at_price, theme.moneyFormat) + ",", o = theme.strings.sale, n = theme.Currency.formatMoney(t.price, theme.moneyFormat)), t.unit_price && (s = theme.strings.unitPrice, c = theme.Currency.formatMoney(t.unit_price, theme.moneyFormat) + " " + theme.strings.unitPriceSeparator + " " + this._getBaseUnit(t)), e = e.replace("[Regular]", i).replace("[$$]", r).replace("[Sale]", o).replace("[$]", n).replace("[UnitPrice]", s).replace("[$$$]", c).trim()
		},
		_updateLiveRegion: function(t) {
			var e = t.variant,
				a = this.container.querySelector(this.selectors.productStatus);
			a.textContent = this._liveRegionText(e), a.setAttribute("aria-hidden", !1), setTimeout(function() {
				a.setAttribute("aria-hidden", !0)
			}, 1e3)
		},
		_updateAddToCart: function(t) {
			var e = t.variant;
			e ? e.available ? (this.$addToCart.removeAttr("aria-disabled").attr("aria-label", theme.strings.addToCart), $(this.selectors.addToCartText, this.$container).text(theme.strings.addToCart), this.$shopifyPaymentButton.show()) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.soldOut), $(this.selectors.addToCartText, this.$container).text(theme.strings.soldOut), this.$shopifyPaymentButton.hide()) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.unavailable), $(this.selectors.addToCartText, this.$container).text(theme.strings.unavailable), this.$shopifyPaymentButton.hide())
		},
		_updateAvailability: function(t) {
			this._hideErrorMessage(), this._updateAddToCart(t), this._updateLiveRegion(t), this._updatePrice(t)
		},
		_updateImages: function(t) {
			var e = t.variant.featured_media.id;
			this._switchImage(e), this._setActiveThumbnail(e)
		},
		_updatePrice: function(t) {
			var a = t.variant,
				i = $(this.selectors.priceContainer, this.$container),
				r = $(this.selectors.regularPrice, i),
				o = $(this.selectors.salePrice, i),
				n = ($(this.selectors.unitPrice, i), $(this.selectors.totalPrice, i), $(this.selectors.labelSale, this.$priceContainer));
			$(this.selectors.unitPriceBaseUnit, i);
			if (i.removeClass(this.classes.productUnavailable).removeClass(this.classes.productOnSale).removeClass(this.classes.productUnitAvailable).removeAttr("aria-hidden"), a) {
				var s = parseInt($("[data-quantity-input]").val());
				a.compare_at_price > a.price ? (r.html(theme.Currency.formatMoney(a.compare_at_price, theme.moneyFormat)), o.html(theme.Currency.formatMoney(a.price, theme.moneyFormat)), $("[data-total-price]").attr("data-price-value", a.price), $("[data-total-price]").html(theme.Currency.formatMoney(a.price * s, theme.moneyFormat)), i.addClass(this.classes.productOnSale), n.show(), n.html("-" + Math.floor((a.compare_at_price - a.price) / a.compare_at_price * 100) + "%")) : (r.html(theme.Currency.formatMoney(a.price, theme.moneyFormat)), o.html(""), $("[data-total-price]").attr("data-price-value", a.price), $("[data-total-price]").html(theme.Currency.formatMoney(a.price * s, theme.moneyFormat)), n.hide()), e() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
			} else i.addClass(this.classes.productUnavailable).attr("aria-hidden", !0)
		},
		_getBaseUnit: function(t) {
			return 1 === t.unit_price_measurement.reference_value ? t.unit_price_measurement.reference_unit : t.unit_price_measurement.reference_value + t.unit_price_measurement.reference_unit
		},
		_updateSKU: function(t) {
			var e = t.variant;
			$(this.selectors.SKU).html(e.sku)
		},
		_setProductCarousel: function() {
			if ($(".product-slider").length) {
				var t = $("#ProductSection-product-template .product_layout .product_photos .product-slider").find(".slider-nav"),
					e = $("#ProductSection-product-template .product_layout .product_photos .product-slider").find(".slider-for"),
					a = t.data("rows");
				if (e.length && (e.slick({
					rows: 0,
					fade: !0,
					arrows: !1,
					slidesToShow: 1,
					slidesToScroll: 1,
					asNavFor: t,
					adaptiveHeight: !0
				}), t.slick({
					infinite: !0,
					slidesToShow: a,
					slidesToScroll: 1,
					arrows: !0,
					rows: 0,
					focusOnSelect: !0,
					asNavFor: e,
					prevArrow: '<div class="slick-prev slick-arrow"><svg class="icon"><use xlink:href="#icon-chevron-left"></svg></div>',
					nextArrow: '<div class="slick-next slick-arrow"><svg class="icon"><use xlink:href="#icon-chevron-right"></svg></div>',
					responsive: [{
						breakpoint: 992,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 1
						}
					}, {
						breakpoint: 550,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 1
						}
					}]
				}).on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
      var i = (currentSlide ? currentSlide : 0) + 1;
      $(".current-dots").text(i);
    })), $(this.selectors.productChangeGroupImage).length) {
					var i = $(this.selectors.productChangeGroupImage).find(".swatch-element.color :radio:checked");
					if ($(this.selectors.productChangeGroupImage, this.$container).find(".product_shop .swatch-element.color").length) {
						if (i.length) void 0 !== (r = i.data("filter")) && (t.slick("slickUnfilter"), e.slick("slickUnfilter"), t.find(r).length && e.find(r).length && (t.slick("slickFilter", r).slick("refresh"), e.slick("slickFilter", r).slick("refresh")))
					} else {
						var r;
						if (0 == i.length && (i = $(this.selectors.productChangeGroupImage, this.$container).find(".product_shop .selector-wrapper.color .form-label")), i.length) void 0 !== (r = i.data("filter")) && (t.slick("slickUnfilter"), e.slick("slickUnfilter"), t.find(r).length && e.find(r).length && (t.slick("slickFilter", r).slick("refresh"), e.slick("slickFilter", r).slick("refresh")));
						$(this.selectors.productChangeGroupImage, this.$container).find(".product_shop .selector-wrapper.color .single-option-selector").on("change", function() {
							var a = $(this).val().replace(/\s/g, "-").toLowerCase(),
								i = ".filter-".concat(a);
							void 0 !== i && (t.slick("slickUnfilter"), e.slick("slickUnfilter"), t.find(i).length && e.find(i).length && (t.slick("slickFilter", i).slick("refresh"), e.slick("slickFilter", i).slick("refresh")));
							var r = $("[data-change-group-image]").find(".product_shop .selector-wrapper.color option:selected").data("image-input");
							$(".slider-nav .item").each(function() {
								var t = $(this).find("img").attr("src");
								r == t && ($(".product-single__thumbnail--product-template").removeClass("active-thumb"), $(this).trigger("click"))
							})
						})
					}
				}
			}
		},
		_initSoldOutProductShop: function() {
			var t = $("[data-soldOut-product]");
			t.length && t.each(function() {
				var t = $(this),
					e = t.data("items").toString().split(","),
					a = t.data("hours").toString().split(","),
					i = Math.floor(Math.random() * e.length),
					r = Math.floor(Math.random() * a.length);
				t.find(".items-count").text(e[i]), t.find(".hours-num").text(a[r])
			})
		},
		_initCustomerViewProductShop: function() {
			var t = $("[data-customer-view]");
			t.length && t.each(function() {
				var t = $(this);
				setInterval(function() {
					var e = t.data("customer-view").split(","),
						a = Math.floor(Math.random() * e.length);
					t.find("label").text(e[a])
				}, 5e3)
			})
		},
		_setShowmore_description: function() {
			if ($(".description_showmore").length && $(window).width() <= 767) {
				var t = $(".showmore"),
					e = $(".showless"),
					a = $(".description_showmore").parent();
				a.css("max-height", 370), t.on("click", function() {
					a.css("max-height", "none"), t.removeClass("show").addClass("hide"), e.removeClass("hide").addClass("show")
				}), e.on("click", function() {
					a.css("max-height", 370), e.removeClass("show").addClass("hide"), t.removeClass("hide").addClass("show")
				})
			}
		},
		_initCountdown: function() {
			$(".product-countdown[data-countdown]").each(function() {
				if (!$(this).hasClass("has-value")) var t = $(this),
					e = new Date(t.attr("data-countdown-value")).getTime(),
					i = setInterval(function() {
						var r = (new Date).getTime(),
							o = e - r;
						if (o < 0) clearInterval(i), document.getElementById("product-countdown").innerHTML = "";
						else {
							var n = Math.floor(o / 864e5),
								s = Math.floor(o % 864e5 / 36e5),
								c = Math.floor(o % 36e5 / 6e4),
								d = Math.floor(o % 6e4 / 1e3),
								l = "<span class='block-time'>" +
							function t(e) {
								if (e < 10) return "<span class='num'>0</span><span class='num'>" + e + "</span>";
								if (e > 100) return t(parseInt(e / 10)) + "<span class='num'>" + e % 10 + "</span>";
								return "<span class='num'>" + parseInt(e / 10) + "</span><span class='num'>" + e % 10 + "</span>"
							}(n) + "<span class='block-label'>days</span></span><span class='block-time'>" + a(s) + "<span class='block-label'>hours</span></span><span class='block-time'>" + a(c) + "<span class='block-label'>mins</span></span><span class='block-time'>" + a(d) + "<span class='block-label'>secs</span></span>";
							t.html(l), t.addClass("has-value")
						}
					}, 1e3)
			})
		},
		_scrollToReview: function() {
			$(document).on("click", ".product_template .product_shop .spr-badge", function(t) {
				if (t.preventDefault(), $(".product_layout").length) var e = $(".product-review__inner").offset();
				else if ($(".tab-pane-review").length) {
					e = $(".productView-description").offset();
					$(window).width() > 767 ? ($(".tab_review .tab-title").trigger("click"), e.top = e.top - 70) : ($(".tab-content .toggle-content.show").prev().find(".toggleLink").trigger("click"), $(".tab-pane-review .toggleLink").trigger("click"))
				}
				$("body,html").animate({
					scrollTop: e.top - 70
				}, 1e3)
			})
		},
		onUnload: function() {
			this.$container.off(this.settings.namespace)
		}
	}), t
}(), theme.product_quickview = function() {
	function t() {
		var t, a, p = $(".product_quickview"),
			u = p.attr("data-section-id");
		if (this.settings = {
			mediaQueryMediumUp: "screen and (min-width: 1025px)",
			mediaQuerySmall: "screen and (max-width: 1024px)",
			bpSmall: !1,
			enableHistoryState: p.data("enable-history-state") || !1,
			namespace: ".slideshow-" + u,
			sectionId: u,
			sliderActive: !1,
			zoomEnabled: !1
		}, this.selectors = {
			addToCart: "[data-add-to-cart]",
			addToCartText: "[data-add-to-cart-text]",
			cartCount: "[data-cart-count]",
			cartCountBubble: "[data-cart-count-bubble]",
			cartPopup: "[data-cart-popup]",
			cartPopupCartQuantity: "[data-cart-popup-cart-quantity]",
			cartPopupClose: "[data-cart-popup-close]",
			cartPopupDismiss: "[data-cart-popup-dismiss]",
			cartPopupImage: "[data-cart-popup-image]",
			cartPopupImageWrapper: "[data-cart-popup-image-wrapper]",
			cartPopupImagePlaceholder: "[data-cart-popup-image-placeholder]",
			cartPopupProductDetails: "[data-cart-popup-product-details]",
			cartPopupQuantity: "[data-cart-popup-quantity]",
			cartPopupQuantityLabel: "[data-cart-popup-quantity-label]",
			cartPopupTitle: "[data-cart-popup-title]",
			cartPopupWrapper: "[data-cart-popup-wrapper]",
			labelSale: "[data-label-sale]",
			loader: "[data-loader]",
			loaderStatus: "[data-loader-status]",
			quantity: "[data-quantity-input]",
			SKU: ".variant-sku",
			productStatus: "[data-product-status]",
			originalSelectorId: "#ProductSelect-" + u,
			productForm: "[data-product-form]",
			errorMessage: "[data-error-message]",
			errorMessageWrapper: "[data-error-message-wrapper]",
			productImageWraps: ".product-single__photo",
			productMainImageWraps: ".product-single__photo.number__1",
			productThumbImages: ".product-single__thumbnail--" + u,
			productThumbs: ".product-single__thumbnails-" + u,
			productThumbListItem: ".product-single__thumbnails-item",
			productFeaturedImage: ".product-featured-img",
			productThumbsWrapper: ".thumbnails-wrapper",
			saleLabel: ".product-price__sale-label-" + u,
			singleOptionSelector: ".single-option-selector-" + u,
			shopifyPaymentButton: ".shopify-payment-button",
			priceContainer: "[data-price-qv]",
			productChangeGroupImage: "[data-change-group-image]",
			productSwatch: "[data-filter]",
			regularPrice: "[data-regular-price-qv]",
			salePrice: "[data-sale-price-qv]",
			unitPrice: "[data-unit-price]",
			unitPriceBaseUnit: "[data-unit-price-base-unit]"
		}, this.classes = {
			cartPopupWrapperHidden: "cart-popup-wrapper--hidden",
			hidden: "hide",
			inputError: "input--error",
			productOnSale: "price--on-sale",
			productUnitAvailable: "price--unit-available",
			productUnavailable: "price--unavailable",
			productFormErrorMessageWrapperHidden: "product-form__error-message-wrapper--hidden",
			activeClass: "active-thumb"
		}, this.$quantityInput = $(this.selectors.quantity, p), this.$errorMessageWrapper = $(this.selectors.errorMessageWrapper, p), this.$addToCart = $(this.selectors.addToCart, p), this.$addToCartText = $(this.selectors.addToCartText, this.$addToCart), this.$loader = $(this.selectors.loader, this.$addToCart), this.$loaderStatus = $(this.selectors.loaderStatus, p), this.$shopifyPaymentButton = $(this.selectors.shopifyPaymentButton, p), $("#ProductJson-" + u).html()) return this.productSingleObject = JSON.parse(document.getElementById("ProductJson-" + u).innerHTML), this.settings.zoomEnabled = $(this.selectors.productImageWraps).hasClass("js-zoom-enabled"), function() {
			var t = this;
			enquire.register(this.settings.mediaQuerySmall, {
				match: function() {
					t.settings.zoomEnabled && $(t.selectors.productImageWraps).each(function() {
						$(this).trigger("zoom.destroy")
					}), t.settings.bpSmall = !0
				},
				unmatch: function() {
					t.settings.bpSmall = !1
				}
			}), enquire.register(this.settings.mediaQueryMediumUp, {
				match: function() {
					t.settings.zoomEnabled && $(t.selectors.productImageWraps).each(function() {
						var t, e;
						t = this, e = $(t).data("zoom"), $(t).zoom({
							url: e
						})
					})
				}
			})
		}(), theme.productStrings = theme.productStrings || {}, $.extend(theme.strings, theme.productStrings), function() {
			var t = {
				$container: $(".product_quickview"),
				enableHistoryState: $(".product_quickview").data("enable-history-state") || !1,
				singleOptionSelector: this.selectors.singleOptionSelector,
				originalSelectorId: this.selectors.originalSelectorId,
				product: this.productSingleObject
			};
			this.variants = new slate.Variants2(t), $(".product_quickview").on("variantChange" + this.settings.namespace, function(t) {
				o(), function(t) {
					var e = t.variant;
					e ? e.available ? (this.$addToCart.removeAttr("aria-disabled").attr("aria-label", theme.strings.addToCart), $(this.selectors.addToCartText, this.$container).text(theme.strings.addToCart), this.$shopifyPaymentButton.show()) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.soldOut), $(this.selectors.addToCartText, this.$container).text(theme.strings.soldOut), this.$shopifyPaymentButton.hide()) : (this.$addToCart.attr("aria-disabled", !0).attr("aria-label", theme.strings.unavailable), $(this.selectors.addToCartText, this.$container).text(theme.strings.unavailable), this.$shopifyPaymentButton.hide())
				}(t), d(t)
			}.bind(this)), $(".product_quickview").on("variantImageChange" + this.settings.namespace, function(t) {
				var e = t.variant.featured_media.id;
				c(e), s(e)
			}.bind(this)), $(".product_quickview").on("variantPriceChange" + this.settings.namespace, d.bind(this)), $(".product_quickview").on("variantSKUChange" + this.settings.namespace, function(t) {
				var e = t.variant;
				$(this.selectors.SKU).html(e.sku)
			}.bind(this))
		}(), function() {
			if (!$(this.selectors.productThumbImages).length) return;
			$(this.selectors.productThumbImages).on("click", function(t) {
				t.preventDefault();
				var e = $(this),
					a = e.data("thumbnail-id");
				c(a), s(a)
			}).on("keyup", function(t) {
				if (t.keyCode !== slate.utils.keyboardKeys.ENTER) return;
				$(this.selectors.productFeaturedImage + ":visible").focus()
			}.bind(this))
		}(), function() {
			$(this.selectors.productForm, this.$container).on("submit", function(t) {
				t.preventDefault(), this.$previouslyFocusedElement = $(":focus");
				var e = this.$quantityInput.val() <= 0;
				if (!this.$addToCart.is("[aria-disabled]")) if (e) this._showErrorMessage(theme.strings.quantityMinimumMessage);
				else {
					r(!0);
					var a = $(this.selectors.productForm, this.$container);
					!
					function(t) {
						var e = {
							url: window.router + "/cart/add.js",
							data: $(t).serialize(),
							dataType: "json"
						};
						$.post(e).done(function(t) {
							o(), function(t) {
								this.$cartPopup = this.$cartPopup || $(this.selectors.cartPopup), this.$cartPopupWrapper = this.$cartPopupWrapper || $(this.selectors.cartPopupWrapper), this.$cartPopupTitle = this.$cartPopupTitle || $(this.selectors.cartPopupTitle), this.$cartPopupQuantity = this.$cartPopupQuantity || $(this.selectors.cartPopupQuantity), this.$cartPopupQuantityLabel = this.$cartPopupQuantityLabel || $(this.selectors.cartPopupQuantityLabel), this.$cartPopupClose = this.$cartPopupClose || $(this.selectors.cartPopupClose), this.$cartPopupDismiss = this.cartPopupDismiss || $(this.selectors.cartPopupDismiss), function() {
									this.$cartPopupWrapper.on("keyup", function(t) {
										t.keyCode === slate.utils.keyboardKeys.ESCAPE && n(t)
									}.bind(this)), this.$cartPopupClose.on("click", n.bind(this)), this.$cartPopupDismiss.on("click", n.bind(this)), $("body").on("click", function(t) {
										var e = $(t.target);
										e[0] === this.$cartPopupWrapper[0] || e.parents(this.selectors.cartPopup).length || n(t)
									}.bind(this)), setTimeout(function() {
										n(!0)
									}, 3e3)
								}(), function(t) {
									var e = this.$quantityInput.length ? this.$quantityInput.val() : 1;
									this.$cartPopupTitle.text(t.product_title), this.$cartPopupQuantity.text(e), this.$cartPopupQuantityLabel.text(theme.strings.quantityLabel.replace("[count]", e)), function(t, e) {
										if (this.$cartPopupImageWrapper = this.$cartPopupImageWrapper || $(this.selectors.cartPopupImageWrapper), this.$cartPopupImagePlaceholder = this.$cartPopupImagePlaceholder || $(this.selectors.cartPopupImagePlaceholder), null === t) return void this.$cartPopupImageWrapper.addClass(this.classes.hidden);
										this.$cartPopupImageWrapper.removeClass(this.classes.hidden);
										var a = theme.Images.getSizedImageUrl(t, "200x"),
											i = document.createElement("img");
										i.src = a, i.alt = e, i.dataset.cartPopupImage = "", i.onload = function() {
											this.$cartPopupImagePlaceholder.addClass(this.classes.hidden), this.$cartPopupImageWrapper.append(i)
										}.bind(this)
									}(t.image, t.title), function(t, e) {
										this.$cartPopupProductDetails = this.$cartPopupProductDetails || $(this.selectors.cartPopupProductDetails);
										var a = "";
										"Default Title" !== t[0] && (a +=
										function(t) {
											var e = "";
											return t.forEach(function(t) {
												e = e + '<li class="product-details__item product-details__item--variant-option">' + t + "</li>"
											}), e
										}(t));
										null !== e && 0 !== Object.keys(e).length && (a +=
										function(t) {
											var e = "";
											return Object.entries(t).forEach(function(t) {
												"_" !== t[0].charAt(0) && 0 !== t[1].length && (e = e + '<li class="product-details__item product-details__item--property"><span class="product-details__property-label">' + t[0] + ": </span>" + t[1])
											}), e
										}(e));
										0 === a.length ? (this.$cartPopupProductDetails.html(""), this.$cartPopupProductDetails.attr("hidden", "")) : (this.$cartPopupProductDetails.html(a), this.$cartPopupProductDetails.removeAttr("hidden"))
									}(t.variant_options, t.properties), $.getJSON("/cart.js").then(function(t) {
										!
										function(t) {
											var e;
											this.$cartPopupCartQuantity = this.$cartPopupCartQuantity || $(this.selectors.cartPopupCartQuantity), 1 === t ? e = theme.strings.oneCartCount : t > 1 && (e = theme.strings.otherCartCount.replace("[count]", t));
											this.$cartPopupCartQuantity.text(t).attr("aria-label", e)
										}(t.item_count), function(t) {
											this.$cartCountBubble = this.$cartCountBubble || $(this.selectors.cartCountBubble), this.$cartCount = this.$cartCount || $(this.selectors.cartCount), this.$cartCountBubble.removeClass(this.classes.hidden), this.$cartCount.text(t)
										}(t.item_count), function() {
											this.$cartPopupWrapper.prepareTransition().removeClass(this.classes.cartPopupWrapperHidden), r(!1), slate.a11y.trapFocus({
												$container: this.$cartPopupWrapper,
												$elementToFocus: this.$cartPopup,
												namespace: "cartPopupFocus"
											})
										}()
									}.bind(this))
								}(t)
							}(t), function() {
								if (!$(".navUser-action-total-price").length) return;
								Shopify.getCart(function(t) {
									$(".navUser-action-total-price .total-price").html(theme.Currency.formatMoney(t.total_price, theme.moneyFormat))
								})
							}(), i(), $(".template-cart").length && window.location.reload()
						}.bind(this)).fail(function(t) {
							this.$previouslyFocusedElement.focus(), function(t) {
								$(this.selectors.errorMessage, this.$container).html(t), 0 !== this.$quantityInput.length && this.$quantityInput.addClass(this.classes.inputError);
								this.$errorMessageWrapper.removeClass(this.classes.productFormErrorMessageWrapperHidden).attr("aria-hidden", !0).removeAttr("aria-hidden")
							}(t.responseJSON.description), r(!1)
						}.bind(this))
					}(a)
				}
			}.bind(this))
		}(), function() {
			$("[data-qtt-qv]");
			var t = $("#product_quickview [data-quantity-input]"),
				a = 1,
				i = 1;
			e() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format");
			$(document).on("click", "[data-qtt-qv]", function(r) {
				r.preventDefault(), r.stopPropagation();
				var o = $(this);
				switch (!0) {
				case o.hasClass("plus"):
					i = a + 1;
					break;
				case o.hasClass("minus") && a > 1:
					i = a - 1
				}
				a = i, t.val(i).trigger("change");
				var n = $("[data-total-price-qv]"),
					s = $("[data-total-price-qv]").attr("data-price-value");
				n.html(theme.Currency.formatMoney(s * i, theme.moneyFormat)), e() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
			})
		}(), function() {
			if (!$(".product_quickview .product-slider").length) return;
			var t = $(".product_quickview .product-slider").find(".slider-nav"),
				e = $(".product_quickview .product-slider").find(".slider-for"),
				a = t.data("rows");
			e.length && (e.slick({
				fade: !0,
				arrows: !1,
				rows: 0,
				slidesToShow: 1,
				slidesToScroll: 1,
				asNavFor: t
			}), t.slick({
				rows: 0,
				infinite: !0,
				slidesToShow: a,
				slidesToScroll: 1,
				arrows: !0,
				focusOnSelect: !0,
				asNavFor: e,
				prevArrow: '<div class="slick-prev slick-arrow"><svg class="icon"><use xlink:href="#icon-chevron-left"></svg></div>',
				nextArrow: '<div class="slick-next slick-arrow"><svg class="icon"><use xlink:href="#icon-chevron-right"></svg></div>',
				responsive: [{
					breakpoint: 992,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 1
					}
				}, {
					breakpoint: 550,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
					}
				}]
			}));
			if ($(this.selectors.productChangeGroupImage).length) {
				var i = $(this.selectors.productChangeGroupImage).find(".swatch-element.color :radio:checked");
				if ($(this.selectors.productChangeGroupImage, this.$container).find(".product_shop .swatch-element.color").length) {
					if (i.length) {
						var r = i.data("filter");
						void 0 !== r && (t.slick("slickUnfilter"), e.slick("slickUnfilter"), t.find(r).length && e.find(r).length && (t.slick("slickFilter", r).slick("refresh"), e.slick("slickFilter", r).slick("refresh")))
					}
				} else {
					if (0 == i.length && (i = $(this.selectors.productChangeGroupImage, this.$container).find(".product_shop .selector-wrapper.color .form-label")), i.length) {
						var r = i.data("filter");
						void 0 !== r && (t.slick("slickUnfilter"), e.slick("slickUnfilter"), t.find(r).length && e.find(r).length && (t.slick("slickFilter", r).slick("refresh"), e.slick("slickFilter", r).slick("refresh")))
					}
					$(this.selectors.productChangeGroupImage, this.$container).find(".product_shop .selector-wrapper.color .single-option-selector").on("change", function() {
						var a = $(this).val().replace(/\s/g, "-").toLowerCase(),
							i = ".filter-".concat(a);
						void 0 !== i && (t.slick("slickUnfilter"), e.slick("slickUnfilter"), t.find(i).length && e.find(i).length && (t.slick("slickFilter", i).slick("refresh"), e.slick("slickFilter", i).slick("refresh")));
						var r = $("[data-change-group-image-qv]").find(".product_shop .selector-wrapper.color option:selected"),
							o = r.data("image-input");
						$(".slider-nav .item").each(function() {
							var t = $(this).find("img").attr("src");
							o == t && ($(".product-single__thumbnail--product-template").removeClass("active-thumb"), $(this).trigger("click"))
						})
					})
				}
			}
		}(), s(), $(".product-countdown[data-countdown]").each(function() {
			if (!$(this).hasClass("has-value")) var t = $(this),
				e = new Date(t.attr("data-countdown-value")).getTime(),
				a = setInterval(function() {
					var i = (new Date).getTime(),
						r = e - i;
					if (r < 0) clearInterval(a), document.getElementById("product-countdown").innerHTML = "";
					else {
						var o = Math.floor(r / 864e5),
							n = Math.floor(r % 864e5 / 36e5),
							s = Math.floor(r % 36e5 / 6e4),
							c = Math.floor(r % 6e4 / 1e3),
							d = "<span class='block-time'>" +
						function t(e) {
							return e < 10 ? "<span class='num'>0</span><span class='num'>" + e + "</span>" : e > 100 ? t(parseInt(e / 10)) + "<span class='num'>" + e % 10 + "</span>" : "<span class='num'>" + parseInt(e / 10) + "</span><span class='num'>" + e % 10 + "</span>"
						}(o) + "<span class='block-label'>days</span></span><span class='block-time'>" + l(n) + "<span class='block-label'>hours</span></span><span class='block-time'>" + l(s) + "<span class='block-label'>mins</span></span><span class='block-time'>" + l(c) + "<span class='block-label'>secs</span></span>";
						t.html(d), t.addClass("has-value")
					}
				}, 1e3)
		}), (t = $("[data-soldOut-product]")).length && t.each(function() {
			var t = $(this),
				e = t.data("items").toString().split(","),
				a = t.data("hours").toString().split(","),
				i = Math.floor(Math.random() * e.length),
				r = Math.floor(Math.random() * a.length);
			t.find(".items-count").text(e[i]), t.find(".hours-num").text(a[r])
		}), (a = $("[data-customer-view]")).length && a.each(function() {
			var t = $(this);
			setInterval(function() {
				var e = t.data("customer-view").split(","),
					a = Math.floor(Math.random() * e.length);
				t.find("label").text(e[a])
			}, 5e3)
		}), $.getScript("https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-595b0ea2fb9c5869").done(function() {
			"undefined" != typeof addthis && (addthis.init(), addthis.layers.refresh())
		}), $(".shopify-product-reviews-badge").length && $(".spr-badge").length ? (window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()) : void 0
	}
	function e() {
		return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency
	}
	function a() {
		$(document).on("click", "[data-quickview]", function(a) {
			a.preventDefault(), a.stopPropagation(), function(a) {
				$.ajax({
					type: "get",
					url: window.router + "/products/" + a + "?view=quickview",
					beforeSend: function() {
						$(".loading-modal").show()
					},
					success: function(a) {
						var r = $("#product_quickview"),
							o = r.find(".product_template");
						if (o.html(a), setTimeout(function() {
							t()
						}, 1e3), $(".loading-modal").hide(), theme.wishlist.init(), $("#product_quickview").modal("show"), function() {
							$("#product_quickview").on("keyup", function(t) {
								t.keyCode === slate.utils.keyboardKeys.ESCAPE && i()
							}.bind(this)), $("#product_quickview .close-modal").on("click", i.bind(this)), $("#product_quickview").on("click", function(t) {
								0 === $(t.target).closest("#product_quickview .modal-quickview").length && i()
							}), $("#video_product").on("click", function(t) {
								$("#video_product .popup-video #video-youtube").length && ($("#video_product").modal("hide"), $("#video-youtube").remove())
							}), $(".product_quickview .video-link").on("click", function(t) {
								var e = $(this).parent().data("video-qv");
								$("#video_product .popup-video").append(e)
							})
						}(), e() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
					}
				})
			}($(this).attr("id")), $(".page-product-detail").length && $(".page-product-detail #video_product .modal-body").find("#video-youtube").remove()
		})
	}
	function i() {
		$("#product_quickview").modal("hide"), setTimeout(function() {
			$("#product_quickview .product_template").html("")
		}, 500)
	}
	function r(t) {
		t ? (this.$addToCart.attr("aria-disabled", !0), this.$addToCartText.addClass(this.classes.hidden), this.$loader.removeClass(this.classes.hidden), this.$shopifyPaymentButton.attr("disabled", !0), this.$loaderStatus.attr("aria-hidden", !1)) : (this.$addToCart.removeAttr("aria-disabled"), this.$addToCartText.removeClass(this.classes.hidden), this.$loader.addClass(this.classes.hidden), this.$shopifyPaymentButton.removeAttr("disabled"), this.$loaderStatus.attr("aria-hidden", !0))
	}
	function o() {
		this.$errorMessageWrapper.addClass(this.classes.productFormErrorMessageWrapperHidden), 0 !== this.$quantityInput.length && this.$quantityInput.removeClass(this.classes.inputError)
	}
	function n(t) {
		var e = 0 === t.detail;
		this.$cartPopupWrapper.prepareTransition().addClass(this.classes.cartPopupWrapperHidden), $(".cart-popup-wrapper").hasClass("cart-popup-wrapper--hidden") && $(".cart-popup-wrapper").removeClass("is-transitioning"), $(this.selectors.cartPopupImage).remove(), this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden), slate.a11y.removeTrapFocus({
			$container: this.$cartPopupWrapper,
			namespace: "cartPopupFocus"
		}), e && this.$previouslyFocusedElement[0].focus(), this.$cartPopupWrapper.off("keyup"), this.$cartPopupClose.off("click"), this.$cartPopupDismiss.off("click"), $("body").off("click")
	}
	function s(t) {
		void 0 === t && (t = $(this.selectors.productImageWraps + ":not(.hide)", this.$container).data("image-id"));
		var e = $(this.selectors.productThumbListItem + ":not(.slick-cloned)", this.$container),
			a = e.find(this.selectors.productThumbImages + "[data-thumbnail-id='" + t + "']");
		if ($(this.selectors.productThumbImages).removeClass(this.classes.activeClass).removeAttr("aria-current"), a.addClass(this.classes.activeClass), a.attr("aria-current", !0), e.hasClass("slick-slide")) {
			var i = a.parent().data("slick-index");
			null == i && (i = 0), $(this.selectors.productThumbs).length && $(this.selectors.productThumbs).slick("slickGoTo", i)
		}
	}
	function c(t) {
		var e = $(this.selectors.productImageWraps + "[data-image-id='" + t + "']", this.$container),
			a = $(this.selectors.productImageWraps + ":not([data-image-id='" + t + "'])", this.$container);
		$(".product-slider").hasClass("custom") && (e.removeClass(this.classes.hidden), a.addClass(this.classes.hidden))
	}
	function d(t) {
		var a = t.variant,
			i = $(this.selectors.priceContainer, this.$container),
			r = $(this.selectors.regularPrice, i),
			o = $(this.selectors.salePrice, i),
			n = ($(this.selectors.unitPrice, i), $(".product_quickview").find(this.selectors.labelSale));
		$(this.selectors.unitPriceBaseUnit, i);
		if (i.removeClass(this.classes.productUnavailable).removeClass(this.classes.productOnSale).removeClass(this.classes.productUnitAvailable).removeAttr("aria-hidden"), a) {
			var s = parseInt($(".product_quickview [data-quantity-input]").val());
			a.compare_at_price > a.price ? (r.html(theme.Currency.formatMoney(a.compare_at_price, theme.moneyFormat)), o.html(theme.Currency.formatMoney(a.price, theme.moneyFormat)), $("[data-total-price-qv]").attr("data-price-value", a.price), $("[data-total-price-qv]").html(theme.Currency.formatMoney(a.price * s, theme.moneyFormat)), i.addClass(this.classes.productOnSale), n.show(), n.html("-" + Math.floor((a.compare_at_price - a.price) / a.compare_at_price * 100) + "%")) : (r.html(theme.Currency.formatMoney(a.price, theme.moneyFormat)), o.html(""), $("[data-total-price-qv]").attr("data-price-value", a.price), $("[data-total-price-qv]").html(theme.Currency.formatMoney(a.price * s, theme.moneyFormat)), n.hide()), e() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
		} else i.addClass(this.classes.productUnavailable).attr("aria-hidden", !0)
	}
	function l(t) {
		return t < 10 ? "<span class='num'>0</span><span class='num'>" + t + "</span>" : "<span class='num'>" + parseInt(t / 10) + "</span><span class='num'>" + t % 10 + "</span>"
	}
	return {
		init: function() {
			a()
		}
	}
}(), theme.product_card = function() {
	function t() {
		this.selectors = {
			cartCount: "[data-cart-count]",
			cartCountBubble: "[data-cart-count-bubble]",
			cartPopup: "[data-cart-popup]",
			cartPopupCartQuantity: "[data-cart-popup-cart-quantity]",
			cartPopupClose: "[data-cart-popup-close]",
			cartPopupDismiss: "[data-cart-popup-dismiss]",
			cartPopupImage: "[data-cart-popup-image]",
			cartPopupImageWrapper: "[data-cart-popup-image-wrapper]",
			cartPopupImagePlaceholder: "[data-cart-popup-image-placeholder]",
			cartPopupProductDetails: "[data-cart-popup-product-details]",
			cartPopupQuantity: "[data-cart-popup-quantity]",
			cartPopupQuantityLabel: "[data-cart-popup-quantity-label]",
			cartPopupTitle: "[data-cart-popup-title]",
			cartPopupWrapper: "[data-cart-popup-wrapper]",
			errorMessage: ".product-card__error-message"
		}, this.classes = {
			cartPopupWrapperHidden: "cart-popup-wrapper--hidden",
			productFormErrorMessageWrapperHidden: "product-form__error-message-wrapper--hidden",
			hidden: "hide"
		};
		$(document).on("click", "[data-btn-addToCart]", function(t) {
			t.preventDefault(), t.stopPropagation();
			var a = $(this),
				i = {
					url: "/cart/add.js",
					data: $(a.data("form-id")).serialize(),
					dataType: "json"
				},
				r = a.parents(".product-card");
			$.post(i).done(function(t) {
				!
				function(t) {
					this.$cartPopup = this.$cartPopup || $(this.selectors.cartPopup), this.$cartPopupWrapper = this.$cartPopupWrapper || $(this.selectors.cartPopupWrapper), this.$cartPopupTitle = this.$cartPopupTitle || $(this.selectors.cartPopupTitle), this.$cartPopupQuantity = this.$cartPopupQuantity || $(this.selectors.cartPopupQuantity), this.$cartPopupQuantityLabel = this.$cartPopupQuantityLabel || $(this.selectors.cartPopupQuantityLabel), this.$cartPopupClose = this.$cartPopupClose || $(this.selectors.cartPopupClose), this.$cartPopupDismiss = this.cartPopupDismiss || $(this.selectors.cartPopupDismiss), function() {
						this.$cartPopupWrapper.on("keyup", function(t) {
							t.keyCode === slate.utils.keyboardKeys.ESCAPE && this._hideCartPopup(t)
						}.bind(this)), this.$cartPopupClose.on("click", e.bind(this)), this.$cartPopupDismiss.on("click", e.bind(this)), $("body").on("click", function(t) {
							var a = $(t.target);
							a[0] === this.$cartPopupWrapper[0] || a.parents(this.selectors.cartPopup).length || e(t)
						}.bind(this)), setTimeout(function() {
							e(!0)
						}, 3e3)
					}(), function(t) {
						this.$cartPopupTitle.text(t.product_title), this.$cartPopupQuantity.text(1), this.$cartPopupQuantityLabel.text(theme.strings.quantityLabel.replace("[count]", 1)), function(t, e) {
							if (this.$cartPopupImageWrapper = this.$cartPopupImageWrapper || $(this.selectors.cartPopupImageWrapper), this.$cartPopupImagePlaceholder = this.$cartPopupImagePlaceholder || $(this.selectors.cartPopupImagePlaceholder), null === t) return void this.$cartPopupImageWrapper.addClass(this.classes.hidden);
							this.$cartPopupImageWrapper.removeClass(this.classes.hidden);
							var a = theme.Images.getSizedImageUrl(t, "200x"),
								i = document.createElement("img");
							i.src = a, i.alt = e, i.dataset.cartPopupImage = "", i.onload = function() {
								this.$cartPopupImagePlaceholder.addClass(this.classes.hidden), this.$cartPopupImageWrapper.append(i)
							}.bind(this)
						}(t.image, t.title), function(t) {
							this.$cartPopupProductDetails = this.$cartPopupProductDetails || $(this.selectors.cartPopupProductDetails);
							var e = "";
							null !== t && 0 !== Object.keys(t).length && (e +=
							function(t) {
								var e = "";
								return Object.entries(t).forEach(function(t) {
									"_" !== t[0].charAt(0) && 0 !== t[1].length && (e = e + '<li class="product-details__item product-details__item--property"><span class="product-details__property-label">' + t[0] + ": </span>" + t[1])
								}), e
							}(t));
							0 === e.length ? (this.$cartPopupProductDetails.html(""), this.$cartPopupProductDetails.attr("hidden", "")) : (this.$cartPopupProductDetails.html(e), this.$cartPopupProductDetails.removeAttr("hidden"))
						}(t.properties), $.getJSON("/cart.js").then(function(t) {
							!
							function(t) {
								var e;
								this.$cartPopupCartQuantity = this.$cartPopupCartQuantity || $(this.selectors.cartPopupCartQuantity), 1 === t ? e = theme.strings.oneCartCount : t > 1 && (e = theme.strings.otherCartCount.replace("[count]", t));
								this.$cartPopupCartQuantity.text(t).attr("aria-label", e)
							}(t.item_count), function(t) {
								this.$cartCountBubble = this.$cartCountBubble || $(this.selectors.cartCountBubble), this.$cartCount = this.$cartCount || $(this.selectors.cartCount), this.$cartCountBubble.removeClass(this.classes.hidden), this.$cartCount.text(t)
							}(t.item_count), function() {
								this.$cartPopupWrapper.prepareTransition().removeClass(this.classes.cartPopupWrapperHidden), slate.a11y.trapFocus({
									$container: this.$cartPopupWrapper,
									$elementToFocus: this.$cartPopup,
									namespace: "cartPopupFocus"
								})
							}()
						}.bind(this))
					}(t)
				}(t), $(".template-cart").length && window.location.reload()
			}.bind(this)).fail(function(t) {
				!
				function(t, e) {
					$(".product-card__error-message .product-form__error-message", e).html(t), $(".product-card__error-message", e).removeClass("product-form__error-message-wrapper--hidden")
				}(t.responseJSON.description, r)
			}.bind(this))
		})
	}
	function e(t) {
		var e = 0 === t.detail;
		this.$cartPopupWrapper.prepareTransition().addClass(this.classes.cartPopupWrapperHidden), $(".cart-popup-wrapper").hasClass("cart-popup-wrapper--hidden") && $(".cart-popup-wrapper").removeClass("is-transitioning"), $(this.selectors.cartPopupImage).remove(), this.$cartPopupImagePlaceholder.removeClass(this.classes.hidden), slate.a11y.removeTrapFocus({
			$container: this.$cartPopupWrapper,
			namespace: "cartPopupFocus"
		}), e && this.$previouslyFocusedElement[0].focus(), this.$cartPopupWrapper.off("keyup"), this.$cartPopupClose.off("click"), this.$cartPopupDismiss.off("click"), $("body").off("click")
	}
	return {
		init: function() {
			t()
		}
	}
}(), theme.product_sticky_atc = function() {
	return {
		init: function() {
			var t, e;
			!
			function() {
				var t = $("[data-sticky-add-to-cart]"),
					e = t.find(".pr-active"),
					a = t.find(".pr-swatch"),
					i = $(".product-form__variants option:selected").val(),
					r = t.find('.pr-swatch[data-value="' + i + '"]'),
					o = r.html();
				e.html(o), r.addClass("active");
				var n = r.data("img");
				$(".sticky-add-to-cart .product-on-cart .product-image img").attr({
					src: n
				}), $(".selector-wrapper").change(function() {
					var t, i = $(".product-form__variants").val();
					if ($(".sticky_form .pr-selectors li").each(function(e) {
						$(this).find("a").data("value") == i ? ($(this).find("a").addClass("active"), t = $(this).find("a").data("img")) : $(this).find("a").removeClass("active")
					}), null != t && $(".sticky-add-to-cart .product-on-cart .product-image img").attr({
						src: t
					}), a.hasClass("active")) {
						var r = $(".sticky_form .pr-swatch.active").html();
						$(".sticky_form .action input[type=hidden]").val(i), e.html(r), e.attr("data-value", i)
					}
				})
			}(), t = $("[data-sticky-add-to-cart]"), e = t.find(".pr-active"), t.find(".pr-swatch"), e.off("click.showListVariant").on("click.showListVariant", function(e) {
				e.preventDefault(), t.toggleClass("open-sticky")
			}), $(document).off("click.hideVariantsOption").on("click.hideVariantsOption", function(a) {
				e.is(a.target) || 0 !== e.has(a.target).length || t.removeClass("open-sticky")
			}), function() {
				var t = $("[data-sticky-add-to-cart]"),
					e = t.find(".pr-active"),
					a = t.find(".pr-swatch");
				a.on("click", function(i) {
					var r = $(this),
						o = r.text(),
						n = r.data("value"),
						s = (r.data("title"), r.data("img")),
						c = r.data("option1");
					return option2 = r.data("option2"), option3 = r.data("option3"), a.removeClass("active"), r.addClass("active"), t.toggleClass("open-sticky"), t.find(".action-wrapper input[type=hidden]").val(n), e.attr("data-value", n).text(o), r.hasClass("sold-out") ? t.find(".btn-sticky-add-to-cart").val(theme.strings.soldOut).addClass("disabled").attr("disabled", "disabled") : t.find(".btn-sticky-add-to-cart").removeClass("disabled").removeAttr("disabled").val(theme.strings.addToCart), $(".sticky-add-to-cart .product-on-cart .product-image img").attr({
						src: s
					}), $(".selector-wrapper-1").hasClass("swatch") ? ($('#ProductSection-product-template .selector-wrapper-1 .single-option-selector-product-template[value="' + c + '"]').click(), $('#ProductSection-product-template .selector-wrapper-2 .single-option-selector-product-template[value="' + option2 + '"]').click(), $('#ProductSection-product-template .selector-wrapper-3 .single-option-selector-product-template[value="' + option3 + '"]').click()) : ($("#ProductSection-product-template .selector-wrapper-1 .single-option-selector-product-template").val(c).change(), $("#ProductSection-product-template .selector-wrapper-2 .single-option-selector-product-template").val(option2).change(), $("#ProductSection-product-template .selector-wrapper-3 .single-option-selector-product-template").val(option3).change()), !1
				})
			}(), $(document).on("click", "[data-sticky-btn-addToCart]", function(t) {
				t.preventDefault(), $("[data-product-form] [data-add-to-cart]").length && $("[data-product-form] [data-add-to-cart]").click()
			}), function() {
				if ($("[data-sticky-add-to-cart]").length) {
					var t = $("[data-add-to-cart]").offset().top + $("[data-add-to-cart]").height();
					$(window).scroll(function() {
						$(this).scrollTop() > t ? $("body").addClass("show_sticky") : $("body").removeClass("show_sticky")
					})
				}
			}()
		}
	}
}(), theme.products_frequently_by_together = function() {
	$("[data-bundle-images-slider]");
	var t = ".fbt-toogle-options",
		e = $(".products-grouped-action .bundle-price"),
		a = $(".products-grouped-info[data-slick]"),
		i = ".fbt-checkbox label",
		r = $(".frequently-bought-together-block"),
		o = ($("[data-cart-count]"), $("[data-cart-count-bubble]"), $("[data-cart-popup-frequently]"), $("[data-cart-popup-cart-quantity]"), $("[data-cart-popup-close-frequently]"), $("[data-cart-popup-dismiss-frequently]"), $("[data-cart-popup-image]"), $("[data-cart-popup-image-wrapper]"), $("[data-cart-popup-image-placeholder]"), $("[data-cart-popup-product-details]"), $("[data-cart-popup-quantity]"), $("[data-cart-popup-quantity-label]"), $("[data-cart-popup-title]"), $("[data-cart-popup-frequently-wrapper]"), $("[data-bundle-addtocart]", r)),
		n = $("[data-add-to-cart-text]", r),
		s = {
			cartPopupWrapperHidden: "cart-popup-wrapper--hidden",
			hidden: "hide",
			inputError: "input--error",
			productOnSale: "price--on-sale",
			productUnitAvailable: "price--unit-available",
			productUnavailable: "price--unavailable",
			productFormErrorMessageWrapperHidden: "product-form__error-message-wrapper--hidden",
			activeClass: "active-thumb"
		},
		c = $("[data-error-message-wrapper]", r),
		d = $("[data-loader]", o),
		l = $("[data-loader-status]", r);

	function p() {
		var t = r.find(".fbt-item.isChecked"),
			e = $(".products-grouped-action .bundle-price"),
			a = $(".products-grouped-action .old-price"),
			o = ($(".products-grouped-action .price-item--regular.price"), e.data("discount-rate")),
			n = 0;
		$(".fbt-item.isChecked").length, $(".fbt-item").length;
		t.each(function() {
			var t = parseFloat($(this).find("[data-fbt-price-change]").attr("data-price"));
			t && (n += t)
		}), $(i).length == t.length ? (window.bundleMatch = !0, a.html(theme.Currency.formatMoney(n, theme.moneyFormat)).show(), e.html(theme.Currency.formatMoney(n * (1 - o), theme.moneyFormat))) : (window.bundleMatch = !1, a.html("").hide(), e.html(theme.Currency.formatMoney(n, theme.moneyFormat))), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
	}
	function u(t) {
		var e = r.find('[data-bundle-product-id="' + t + '"]'),
			a = _.map($(".single-option-selector-frequently", e), function(t) {
				var e = $(t),
					a = e.attr("type"),
					i = {};
				return "radio" === a || "checkbox" === a ? !! e[0].checked && (i.value = e.val(), i.index = e.data("index"), i) : (i.value = e.val(), i.index = e.data("index"), i)
			});
		return a = _.compact(a)
	}
	var h = {};

	function m() {
		$(".single-option-selector-frequently", this.$bundleContainer).on("change", function(t) {
			const e = $(t.currentTarget).closest("[data-bundle-product-id]").data("bundle-product-id");
			$(t.currentTarget).data("index"), $(t.currentTarget).val();
			if (e) {
				for (var a = window.productVariants[e], i = 0; i < a.length; i++) a[i].id == r.find("#ProductSelect-" + e).val() && (h = a[i]);
				var o = function(t) {
						var e = !1,
							a = r.find('[data-bundle-product-id="' + t + '"]');
						a.find(".fbt-selector-wrapper-1").hasClass("swatch") && (e = !0);
						var i, o, n, s = u(t),
							c = window.productVariants[t],
							d = _.find(c, function(t) {
								return s.every(function(e) {
									return _.isEqual(t[e.index], e.value)
								})
							});
						return null != d && 0 != d.available || (1 == e ? (i = a.find(".fbt-selector-wrapper-1 input:checked").val(), o = a.find(".fbt-selector-wrapper-2 input:checked").val(), n = a.find(".fbt-selector-wrapper-3 input:checked").val(), a.find(".fbt-selector-wrapper-3 .swatch-element").each(function() {
							var t = $(this).data("value");
							console.log(t), null == c.find(function(e) {
								return e.option1 == i && e.option2 == o && e.option3 == t && e.available
							}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0))
						}), s = u(t), null != (d = _.find(c, function(t) {
							return s.every(function(e) {
								return _.isEqual(t[e.index], e.value)
							})
						})) && 0 != d.available || (a.find(".fbt-selector-wrapper-3 .swatch-element").each(function() {
							var t = $(this).data("value");
							null == c.find(function(e) {
								return e.option1 == i && e.option3 == t && e.available
							}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0))
						}), n = a.find(".fbt-selector-wrapper-3 input:checked").val(), a.find(".fbt-selector-wrapper-2 .swatch-element").each(function() {
							var t = $(this).data("value");
							null == c.find(function(e) {
								return e.option1 == i && e.option3 == n && e.option2 == t && e.available
							}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1), $(this).find(":radio").prop("checked", !0))
						}), s = u(t), d = _.find(c, function(t) {
							return s.every(function(e) {
								return _.isEqual(t[e.index], e.value)
							})
						}))) : (i = a.find(".fbt-selector-wrapper-1 option:selected").val(), o = a.find(".fbt-selector-wrapper-2 option:selected").val(), n = a.find(".fbt-selector-wrapper-3 option:selected").val(), $(".fbt-selector-wrapper-3 .single-option-selector option", this.$container).each(function() {
							var t = $(this).val(),
								e = c.find(function(e) {
									return e.option1 == i && e.option2 == o && e.option3 == t && e.available
								});
							null == e ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-3", this.$container).html(e.option3))
						}), s = u(t), null != (d = _.find(c, function(t) {
							return s.every(function(e) {
								return _.isEqual(t[e.index], e.value)
							})
						})) && 0 != d.available || ($(".fbt-selector-wrapper-3 .single-option-selector option", this.$container).each(function() {
							var t = $(this).val(),
								e = c.find(function(e) {
									return e.option1 == i && e.option3 == t && e.available
								});
							null == e ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-3", this.$container).html(e.option3))
						}), n = $(".fbt-selector-wrapper-3", this.$container).find("option:selected").val(), $(".fbt-selector-wrapper-2 .single-option-selector option", this.$container).each(function() {
							var t = $(this).val(),
								e = c.find(function(e) {
									return e.option1 == i && e.option3 == n && e.option2 == t && e.available
								});
							null == e ? $(this).attr("disabled", "disabled").removeAttr("selected", "selected").prop("selected", !1) : ($(this).removeAttr("disabled", "disabled").attr("selected", "selected").prop("selected", !0), $(".label-value-2", this.$container).html(e.option2))
						}), s = u(t), d = _.find(c, function(t) {
							return s.every(function(e) {
								return _.isEqual(t[e.index], e.value)
							})
						})))), d
					}(e);
				if (v(), !o) return;
				!
				function(t, e) {
					r.find("#ProductSelect-" + t).val(e.id).trigger("change")
				}(e, o), function(t, e) {
					var a = e.featured_image || {},
						i = h.featured_image || {};
					e.featured_image && a.src !== i.src && r.find('[data-bundle-product-id="' + t + '"] img').attr("src", a.src)
				}(e, o), function(t, e) {
					if (e.price !== h.price || e.compare_at_price !== h.compare_at_price) {
						var a = $(".product-price", r.find('[data-bundle-product-id="' + t + '"]')),
							i = $(".price-item--regular", a),
							o = $(".price-item--sale", a),
							n = $("[data-unit-price]", a),
							c = $("[data-unit-price-base-unit]", a);
						a.removeClass(s.productUnavailable).removeClass(s.productOnSale).removeClass(s.productUnitAvailable).removeAttr("aria-hidden"), e ? (e.compare_at_price > e.price ? (i.html(theme.Currency.formatMoney(e.compare_at_price, theme.moneyFormat)), o.html(theme.Currency.formatMoney(e.price, theme.moneyFormat)), a.addClass(s.productOnSale)) : (i.html(theme.Currency.formatMoney(e.price, theme.moneyFormat)), o.html("")), $("[data-fbt-price-change]", a).attr("data-price", e.price), e.unit_price && (n.html(theme.Currency.formatMoney(e.unit_price, theme.moneyFormat)), c.html(function(t) {
							return 1 === t.unit_price_measurement.reference_value ? t.unit_price_measurement.reference_unit : t.unit_price_measurement.reference_value + t.unit_price_measurement.reference_unit
						}(e)), a.addClass(s.productUnitAvailable))) : a.addClass(s.productUnavailable).attr("aria-hidden", !0)
					}
				}(e, o), function(t, e, a, i) {
					var o = !1,
						n = r.find('[data-bundle-product-id="' + t + '"]');
					if (n.find(".fbt-selector-wrapper-1").hasClass("swatch") && (o = !0), e && t) if (1 == o) {
						var s = window.productVariants[t],
							c = n.find(".selector-wrapper"),
							d = n.find(".fbt-selector-wrapper-1 input:checked").val(),
							l = n.find(".fbt-selector-wrapper-2 input:checked").val();
						n.find(".fbt-selector-wrapper-3 input:checked").val(), c.each(function() {
							var t = $(this).data("option-index"),
								e = $(this).find(".swatch-element");
							switch (t) {
							case 1:
								e.each(function() {
									var t = $(this).data("value");
									null == s.find(function(e) {
										return e.option1 == t && e.available
									}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
								});
								break;
							case 2:
								e.each(function() {
									var t = $(this).data("value");
									null == s.find(function(e) {
										return e.option1 == d && e.option2 == t && e.available
									}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
								});
								break;
							case 3:
								e.each(function() {
									var t = $(this).data("value");
									null == s.find(function(e) {
										return e.option1 == d && e.option2 == l && e.option3 == t && e.available
									}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
								})
							}
						})
					} else s = window.productVariants[t], c = n.find(".selector-wrapper"), d = n.find(".fbt-selector-wrapper-1 option:selected").val(), l = n.find(".fbt-selector-wrapper-2 option:selected").val(), n.find(".fbt-selector-wrapper-3 option:selected").val(), c.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find("option");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).val();
								null == s.find(function(e) {
									return e.option1 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).val();
								null == s.find(function(e) {
									return e.option1 == d && e.option2 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).val();
								null == s.find(function(e) {
									return e.option1 == d && e.option2 == l && e.option3 == t && e.available
								}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
							})
						}
					})
				}(e, o), p()
			}
		})
	}
	function f(t) {
		t ? (o.attr("aria-disabled", !0), n.addClass(s.hidden), d.removeClass(s.hidden), l.attr("aria-hidden", !1)) : (o.removeAttr("aria-disabled"), n.removeClass(s.hidden), d.addClass(s.hidden), l.attr("aria-hidden", !0))
	}
	function v() {
		c.addClass(s.productFormErrorMessageWrapperHidden)
	}
	function g() {
		$(".frequently-bought-together_form", this.$bundleContainer).on("submit", function(t) {
			t.preventDefault(), f(!0);
			var e = $(t.currentTarget).find(".fbt-item.isChecked");
			Shopify.queue = [];
			e.length;
			e.each(function() {
				var t = $(this).find('[name="group_id"]').val();
				"" !== t && Shopify.queue.push({
					variantId: t,
					quantity: 1
				})
			}), function t(e) {
				if (!Shopify.queue.length) return f(!1), !1;
				var a = Shopify.queue.shift(),
					i = {
						url: "/cart/add.js",
						data: "quantity=" + a.quantity + "&id=" + a.variantId + "&form_type=product",
						dataType: "json"
					};
				if ($.post(i).done(function(e) {
					t(), v(), form.submit()
				}.bind(this)).fail(function(t) {
					!
					function(t) {
						$(this.selectors.errorMessage, this.$container).html(t), c.removeClass(this.classes.productFormErrorMessageWrapperHidden).attr("aria-hidden", !0).removeAttr("aria-hidden")
					}(t.responseJSON.description), f(!1)
				}.bind(this)), 0 == Shopify.queue.length) try {
					var r = "FBT-BUNDLE-" + meta.product.id;
					!
					function(t) {
						window.bundleMatch && $.ajax({
							url: "/discount/" + t + "?redirect=/cart",
							success: function(e) {
								window.location.href = "/discount/" + t + "?redirect=/cart"
							}
						})
					}(r)
				} catch (t) {}
			}()
		}.bind(this))
	}
	return {
		init: function() {
			a.length && (a.hasClass("slick-slider") || a.slick()), $(document).on("click", t, function(t) {
				t.preventDefault(), $(this).parents(".product-content").next().slideToggle()
			}), $(document).on("click", ".close-options", function(t) {
				t.preventDefault(), $(this).parent().slideToggle()
			}), function() {
				if (e.length > 0) {
					var t = 100 * e.data("discount-rate"),
						a = $(".products-grouped-action .discount-text");
					a.length > 0 && a.each(function() {
						$(this).text($(this).text().replace("[discount]", t))
					})
				}
			}(), $(document).on("click", i, function(t) {
				t.preventDefault();
				var e = $(this),
					a = e.prev(),
					i = e.closest(".fbt-item").data("bundle-product-id");
				a.prop("checked") ? (a.prop("checked", !1), $('[data-bundle-product-id="' + i + '"]').removeClass("isChecked")) : (a.prop("checked", !0), $('[data-bundle-product-id="' + i + '"]').addClass("isChecked")), p()
			}), r.find("[data-bundle-product-id]").each(function() {
				var t = $(this).data("bundle-product-id"),
					e = r.find('[data-bundle-product-id="' + t + '"]'),
					a = !1;
				if (e.find(".fbt-selector-wrapper-1").hasClass("swatch") && (a = !0), 1 == a) {
					var i = window.productVariants[t],
						o = e.find(".selector-wrapper"),
						n = e.find(".fbt-selector-wrapper-1 input:checked").val(),
						s = e.find(".fbt-selector-wrapper-2 input:checked").val();
					e.find(".fbt-selector-wrapper-3 input:checked").val(), o.each(function() {
						var t = $(this).data("option-index"),
							e = $(this).find(".swatch-element");
						switch (t) {
						case 1:
							e.each(function() {
								var t = $(this).data("value");
								null == i.find(function(e) {
									return e.option1 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 2:
							e.each(function() {
								var t = $(this).data("value");
								null == i.find(function(e) {
									return e.option1 == n && e.option2 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							});
							break;
						case 3:
							e.each(function() {
								var t = $(this).data("value");
								null == i.find(function(e) {
									return e.option1 == n && e.option2 == s && e.option3 == t && e.available
								}) ? ($(this).addClass("soldout"), $(this).find(":radio").prop("disabled", !0)) : ($(this).removeClass("soldout"), $(this).find(":radio").prop("disabled", !1))
							})
						}
					})
				} else i = window.productVariants[t], o = e.find(".selector-wrapper"), n = e.find(".fbt-selector-wrapper-1 option:selected").val(), s = e.find(".fbt-selector-wrapper-2 option:selected").val(), e.find(".fbt-selector-wrapper-3 option:selected").val(), o.each(function() {
					var t = $(this).data("option-index"),
						e = $(this).find("option");
					switch (t) {
					case 1:
						e.each(function() {
							var t = $(this).val();
							null == i.find(function(e) {
								return e.option1 == t && e.available
							}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
						});
						break;
					case 2:
						e.each(function() {
							var t = $(this).val();
							null == i.find(function(e) {
								return e.option1 == n && e.option2 == t && e.available
							}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
						});
						break;
					case 3:
						e.each(function() {
							var t = $(this).val();
							null == i.find(function(e) {
								return e.option1 == n && e.option2 == s && e.option3 == t && e.available
							}) ? $(this).attr("disabled", "disabled") : $(this).removeAttr("disabled", "disabled")
						})
					}
				})
			}), m(), p(), g()
		}
	}
}(), theme.ProductRecommendations = function() {
	var t = "[data-product-card]";

	function e(t) {
		this.$container = $(t);
		var e = this.$container.data("productId"),
			a = this.$container.data("baseUrl") + "?section_id=product-recommendations&product_id=" + e + "&limit=5";
		$.get(a).then(function(t) {
			var e = $(t).html();
			"" !== e.trim() && (this.$container.html(e), this.sendTrekkieEvent()), theme.wishlist.init(), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".product-recommendations__inner").each(function(t) {
				var e = $(this).find("[data-slick]");
				e.length && (e.hasClass("slick-slider") || e.slick())
			})
		}.bind(this))
	}
	return e.prototype = _.assignIn({}, e.prototype, {
		sendTrekkieEvent: function() {
			if (window.ShopifyAnalytics && window.ShopifyAnalytics.lib && window.ShopifyAnalytics.lib.track) {
				var e = this.$container[0].getBoundingClientRect().top <= window.innerHeight,
					a = this.$container.find(t).length;
				window.ShopifyAnalytics.lib.track("Product Recommendations Displayed", {
					theme: "debut",
					didPageJumpOccur: e,
					numberOfRecommendationsDisplayed: a
				})
			}
		}
	}), e
}(), theme.VideoSection = function() {
	return function(t) {
		var e = this.$container = $(t);
		$(".video", e).each(function() {
			var t = $(this);
			theme.Video.init(t), theme.Video.editorLoadVideo(t.attr("id"))
		})
	}
}(), theme.VideoSection.prototype = _.assignIn({}, theme.VideoSection.prototype, {
	onUnload: function() {
		theme.Video.removeEvents()
	}
}), theme.SlideshowSection = function() {
	function t(t) {
		t.each(function() {
			var t = $(this);
			if (t.find(".youtube").length > 0) {
				function e(t, e) {
					null != t && null != e && t.contentWindow.postMessage(JSON.stringify(e), "*")
				}
				function a(t, a) {
					var i, r, o;
					if (r = (i = t.find(".slick-current .slide-video")).find("iframe").get(0), i.hasClass("youtube")) switch (a) {
					case "play":
						e(r, {
							event: "command",
							func: "mute"
						}), e(r, {
							event: "command",
							func: "playVideo"
						});
						break;
					case "pause":
						e(r, {
							event: "command",
							func: "pauseVideo"
						})
					} else i.hasClass("mp4") && null != (o = i.children("video").get(0)) && ("play" === a ? o.play() : o.pause())
				}
				t.addClass("slick-slider--video"), t.on("init", function(t) {
					t = $(t.currentTarget), setTimeout(function() {
						a(t, "play")
					}, 1e3)
				}), t.on("beforeChange", function(t, e) {
					a(e = $(e.$slider), "pause")
				}), t.on("afterChange", function(t, e) {
					a(e = $(e.$slider), "play")
				})
			}
		})
	}
	function e(t) {
		return t < 10 ? "<span class='num'>0</span><span class='num'>" + t + "</span>" : "<span class='num'>" + parseInt(t / 10) + "</span><span class='num'>" + t % 10 + "</span>"
	}
	function a(t) {
		$("[data-countdown]").each(function() {
			if (!$(this).hasClass("has-value")) var t = $(this),
				a = new Date(t.attr("data-countdown-value")).getTime(),
				i = setInterval(function() {
					var r = (new Date).getTime(),
						o = a - r;
					if (o < 0) clearInterval(i), document.getElementById("slide-countdown").innerHTML = "";
					else {
						var n = Math.floor(o / 864e5),
							s = Math.floor(o % 864e5 / 36e5),
							c = Math.floor(o % 36e5 / 6e4),
							d = Math.floor(o % 6e4 / 1e3),
							l = "<span class='block-time'>" +
						function t(e) {
							return e < 10 ? "<span class='num'>0</span><span class='num'>" + e + "</span>" : e > 100 ? t(parseInt(e / 10)) + "<span class='num'>" + e % 10 + "</span>" : "<span class='num'>" + parseInt(e / 10) + "</span><span class='num'>" + e % 10 + "</span>"
						}(n) + "<span class='block-label'>days</span></span><span class='block-time'>" + e(s) + "<span class='block-label'>hours</span></span><span class='block-time'>" + e(c) + "<span class='block-label'>mins</span></span><span class='block-time'>" + e(d) + "<span class='block-label'>secs</span></span>";
						t.html(l), t.addClass("has-value")
					}
				}, 1e3)
		})
	}
	return function() {
		var e = $(".slideshow[data-slick]");
		e.length && (e.slick(), function(e) {
			if (e.find(".youtube").length > 0) if ("undefined" == typeof YT || void 0 === YT.Player) {
				var a = document.createElement("script");
				a.src = "https://www.youtube.com/iframe_api";
				var i = document.getElementsByTagName("script")[0];
				i.parentNode.insertBefore(a, i), window.onYouTubeIframeAPIReady = t.bind(window, e)
			} else t(e)
		}(e), function(t) {
			t.find(".slide-video.mp4").length > 0 && (currentSlide = t.find(".slick-current"), video = currentSlide.find("video").get(0), null != video && video.play(), t.on("init", function() {}), t.on("beforeChange", function() {}), t.on("afterChange", function(t, e, a) {
				video.play()
			}))
		}(e), a()), e.each(function() {
			$(this).find(".slide-video").length
		})
	}
}(), theme.collection = function() {
	function t(t) {
		return t < 10 ? "<span class='num'>0</span><span class='num'>" + t + "</span>" : "<span class='num'>" + parseInt(t / 10) + "</span><span class='num'>" + t % 10 + "</span>"
	}
	function e() {
		$(".product-countdown[data-countdown]").each(function() {
			if (!$(this).hasClass("has-value")) var e = $(this),
				a = new Date(e.attr("data-countdown-value")).getTime(),
				i = setInterval(function() {
					var r = (new Date).getTime(),
						o = a - r;
					if (o < 0) clearInterval(i), document.getElementById("product-countdown").innerHTML = "";
					else {
						var n = Math.floor(o / 864e5),
							s = Math.floor(o % 864e5 / 36e5),
							c = Math.floor(o % 36e5 / 6e4),
							d = Math.floor(o % 6e4 / 1e3),
							l = "<span class='block-time'>" +
						function t(e) {
							return e < 10 ? "<span class='num'>0</span><span class='num'>" + e + "</span>" : e > 100 ? t(parseInt(e / 10)) + "<span class='num'>" + e % 10 + "</span>" : "<span class='num'>" + parseInt(e / 10) + "</span><span class='num'>" + e % 10 + "</span>"
						}(n) + "<span class='block-label'>days</span></span><span class='block-time'>" + t(s) + "<span class='block-label'>hours</span></span><span class='block-time'>" + t(c) + "<span class='block-label'>mins</span></span><span class='block-time'>" + t(d) + "<span class='block-label'>secs</span></span>";
						e.html(l), e.addClass("has-value")
					}
				}, 1e3)
		})
	}
	function a() {
		$(".infinite-scrolling").length && $(document).on("click", ".infinite-scrolling a", function(t) {
			(t.preventDefault(), t.stopPropagation(), $(this).hasClass("disabled")) ||
			function(t) {
				$.ajax({
					type: "get",
					url: t,
					beforeSend: function() {
						$(".loading-modal").show()
					},
					success: function(t) {
						!
						function(t) {
							var e = $(".page-collections").find(".halo-column-product"),
								a = $(t).find(".page-collections"),
								i = a.find(".halo-column-product"),
								r = i.children(".halo-item"),
								o = a.find(".pagination-wrapper"),
								n = $(".infinite-scrolling a");
							if (i.length && (e.append(r), $(t).find(".infinite-scrolling").length > 0 ? (n.attr("href", a.find(".infinite-scrolling a").attr("href")), n.text(theme.strings.showMore1)) : (n.addClass("disabled"), n.text(theme.strings.noMore)), $(".pagination-wrapper").html(o.html()), theme.wishlist.init(), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length && $(".spr-badge").length)) window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
						}(t), theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
					},
					complete: function() {
						$(".loading-modal").hide()
					}
				})
			}($(this).attr("href"))
		})
	}
	return {
		init: function() {
			var t;
			!
			function() {
				if ($(".custom-html").length) {
					var t = $(".custom-html"),
						e = theme.strings.showMore,
						a = theme.strings.showLess,
						i = '<div class="button-group text-center"><a id="button-showmore-html" class="btn" href="#"><span class="text">' + theme.strings.showMore + "</span></a>";
					t.each(function() {
						var t = $(this).html();
						if (t.length > 435) {
							var e = t.substr(0, 435) + '<span class="moreellipses">...&nbsp;</span><span class="morecontent"><span>' + t.substr(435, t.length - 435) + "</span></span>";
							e += i, $(this).html(e)
						}
					}), $("#button-showmore-html").on("click", function(i) {
						i.preventDefault(), $(this).hasClass("less") ? ($(this).removeClass("less"), $(this).find(".text").html(e), t.removeClass("showmore")) : ($(this).addClass("less"), $(this).find(".text").html(a), t.addClass("showmore"))
					})
				}
			}(), t = $("#collection-page"), $(document).on("click", ".view-as-btn a", function() {
				var e = $(this).attr("data-layout");
				document.getElementById("collection-page").className = "", t.addClass(e)
			}), e(), $("[data-section-type='collection-tabs'] .collection-tab-banner").each(function() {
				var t = $(this).find("[data-slick]");
				t.length && (t.hasClass("slick-slider") || t.slick())
			}), a()
		}
	}
}(), theme.homepage_section = function() {
	function t() {
		$(".infinite-scrolling1").length && $(document).on("click", ".infinite-scrolling1 a", function(t) {
			if (t.preventDefault(), t.stopPropagation(), $(this).hasClass("ajax-loading")) return !1;
			$(this).addClass("ajax-loading"), $(this).hasClass("disabled") ||
			function(t) {
				var e = $(t.currentTarget).attr("data-collection"),
					a = $(t.currentTarget).attr("data-limit"),
					i = parseInt($(t.currentTarget).attr("data-page"));
				$.ajax({
					type: "get",
					url: window.router + "/collections/" + e,
					cache: !1,
					data: {
						view: "sorting",
						constraint: "limit=" + a + "+page=" + i
					},
					beforeSend: function() {
						$(".loading-modal").show()
					},
					success: function(e) {
						if ($(".section-product-new-sections .halo-row-new").append(e), $(e).length == a ? $(t.currentTarget).attr("data-page", i + 1) : $(t.currentTarget).attr("disabled", "disabled"), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length && $(".spr-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
					},
					complete: function() {
						$(".loading-modal").hide(), $(t.currentTarget).removeClass("ajax-loading"), $(".infinite-scrolling1").remove()
					}
				})
			}(t)
		})
	}
	return {
		init: function() {
			$("[data-section-type='logolist']").length && $("[data-section-type='logolist']").each(function(t) {
				var e = $(this).find("[data-slick]");
				e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-section-type='featured-blog-section']").each(function(t) {
				var e = $(this).find("[data-slick]");
				$(window).width() < 1025 ? e.length && e.hasClass("slick-slider") && e.slick("unslick") : e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-gallery-images]").each(function(t) {
				var e = $(this).find("[data-slick]");
				$(window).width() < 1025 ? e.length && e.hasClass("slick-slider") && e.slick("unslick") : e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-gallery-images2]").each(function(t) {
				var e = $(this).find("[data-slick]");
				e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-section-type='featured-blog-section'] .halo-blog-layout-video").each(function(t) {
				var e = $(this).find("[data-slick]");
				$(window).width() < 1025 ? e.length && e.hasClass("slick-slider") && e.slick("unslick") : e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-section-type='customBlockCarousel']").length && $("[data-section-type='customBlockCarousel']").each(function(t) {
				var e = $(this).find("[data-slick]");
				$(window).width() < 1025 ? e.length && e.hasClass("slick-slider") && e.slick("unslick") : e.length && (e.hasClass("slick-slider") || e.slick())
			}), $(".btn-arrow-prev").on("click", function(t) {
				t.preventDefault(), $(this).parents("[data-carousel]").find("[data-slick]").slick("slickPrev")
			}), $(".btn-arrow-next").on("click", function(t) {
				t.preventDefault(), $(this).parents("[data-carousel]").find("[data-slick]").slick("slickNext")
			}), $("[data-section-type='collection'] [data-slick]").each(function(t) {
				var e = $(this);
				e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-section-type='hero-section'] [data-slick]").each(function(t) {
				var e = $(this);
				e.length && (e.hasClass("slick-slider") || e.slick())
			}), function() {
				if (!$("#back-to-top").length) return;
				var t = $(window).height() / 2;
				const e = $("#back-to-top");
				$(window).scroll(function() {
					$(this).scrollTop() > t ? e.addClass("is-visible") : e.removeClass("is-visible")
				}), e.on("click", function(t) {
					t.preventDefault(), $("body,html").animate({
						scrollTop: 0
					}, 1e3)
				})
			}(), $("[data-section-type='hero-section']").length && ($(".btn-popup-video").on("click", function() {
				var t = $(this).attr("data-id");
				const e = '<div class="modal-content">                        <div class="modal-header"><h5 class="modal-title">Popup Video</h5>                            <a class="close close-modal" data-dismiss="modal" class="close close-modal" href="javascript:void(0)"><svg class="icon icon-close"><use xlink:href="#icon-close" /></svg></a>                        </div>                        <div class="modal-body">                        <div class="popup-video" data-video-gallery>                            <div id="popup-video-content">                                <div class="popup-video-main">                                    <iframe                                        id="player"                                        type="text/html"                                        width="100%"                                        frameborder="0"                                        webkitAllowFullScreen                                        mozallowfullscreen                                        allowFullScreen                                        src="' + $(this).attr("data-src") + '"                                        data-video-player>                                    </iframe>                                </div>                            </div>                        </div>                        </div>                    </div>';
				$("#popup_video_" + t + " .modal-video").html(e)
			}), $(document).on("click", function(t) {
				$(".halo_modal_video .modal-video .modal-content").length && 0 === $(t.target).closest(".btn-popup-video").length && 0 === $(t.target).closest(".halo_modal_video .close-modal").length && $(".halo_modal_video .modal-video .modal-content").remove()
			})), $(".points_popup .point").on("click", function() {
				var t = $(this).parent(),
					e = t.position(),
					a = $(this).siblings();
				$(window).width() < 1024 && a.css({
					top: 100 - e.top,
					left: 30 - e.left
				}), t.addClass("is-open")
			}), $(".custom-product-card .close").on("click", function() {
				$(this).parents(".points_popup").removeClass("is-open")
			}), $(document).on("click", function(t) {
				0 === $(t.target).closest(".custom-product-card").length && 0 === $(t.target).closest(".points_popup").length && $(".points_popup").removeClass("is-open")
			}), $("[data-fancybox]").fancybox({
				mobile: {
					clickContent: "close",
					clickSlide: "close"
				},
				buttons: ["zoom", "slideShow", "close"]
			}), function() {
				if ($(".ask-an-expert").length) {
					var t = $(".ask-an-expert"),
						e = $(window).height() / 2;
					$(window).scroll(function() {
						$(this).scrollTop() > e ? ($(t).fadeIn(400), $(t).show()) : $(t).fadeOut(400)
					})
				}
			}(), t()
		}
	}
}(), theme.header = function() {
	function t() {
		var t, e;
		$(".header-sticky").length && ($(window).width() > 1199 ? (e = $(".header-sticky").height(), function(t, e) {
			$(window).on("scroll load", function(t) {
				var a = $(window).scrollTop();
				a > e ? ($(".header-sticky").addClass("is-sticky"), $("body").css("padding-top", e), $(".halo-header-01").length) : ($(".header-sticky").removeClass("is-sticky"), $("body").css("padding-top", 0), $(".halo-header-01").length && $(".halo_mobileNavigation_wrapper #site-nav").length && ($(".halo_mobileNavigation_wrapper #site-nav").appendTo(".halo-header-01 .halo-header-PC .header-bottom .container"), document.getElementById("site-nav").className = "site-nav"))
			}), window.onload = function() {
				$(window).scrollTop() > t && $(".header-sticky").addClass("is-sticky")
			}
		}((t = $(".page-container").offset()).top, e)) : (e = $(".halo-header-mobile").height(), function(t, e) {
			$(".halo-header-01").length && $(".halo-header-01 .halo-header-PC #site-nav").length && ($(".halo-header-01 .halo-header-PC #site-nav").appendTo(".halo_mobileNavigation_wrapper .site-nav-mobile-wrapper"), document.getElementById("site-nav").className = "site-nav-mobile");
			$(window).on("scroll load", function(t) {
				var a = $(window).scrollTop();
				a > e ? ($(".header-sticky").addClass("is-sticky"), $("body").css("padding-top", e)) : ($(".header-sticky").removeClass("is-sticky"), $(".announcement-bar").show(), $("body").css("padding-top", 0))
			}), window.onload = function() {
				$(window).scrollTop() > t && $(".header-sticky").addClass("is-sticky")
			}
        }((t = $(".page-container").offset()).top, e), function(t, e) {
			$(".halo-header-02").length && $(".halo-header-02 .halo-header-PC #site-nav").length && ($(".halo-header-02 .halo-header-PC #site-nav").appendTo(".halo_mobileNavigation_wrapper .site-nav-mobile-wrapper"), document.getElementById("site-nav").className = "site-nav-mobile");
			$(window).on("scroll load", function(t) {
				var a = $(window).scrollTop();
				a > e ? ($(".header-sticky").addClass("is-sticky"), $("body").css("padding-top", e)) : ($(".header-sticky").removeClass("is-sticky"), $(".announcement-bar").show(), $("body").css("padding-top", 0))
			}), window.onload = function() {
				$(window).scrollTop() > t && $(".header-sticky").addClass("is-sticky")
			}
		}(t.top, e)))
	}
	function e() {
		var t = $(".lang_currency-dropdown"),
			e = t.find(".dropdown-label");
		e.length && e.is(":visible") ? (e.on("click", function(t) {
			t.preventDefault(), t.stopPropagation();
			var a = $(this).next();
			a.is(":visible") ? a.hide() : (e.next(".dropdown-menu").hide(), a.show())
		}), $(document).on("click", function(t) {
			var e = $(".lang_currency-dropdown .dropdown-menu");
			e.is(t.target) || e.has(t.target).length || e.hide()
		}), $(t.find(".dropdown-item")).on("click", function(t) {
			e.next(".dropdown-menu").hide()
		})) : e.next(".dropdown-menu").css({
			display: ""
		})
	}
	function a(t, e, a) {
		if (a.length && a.is(":visible")) {
			var i = e.html();
			t.prev(a).html(i)
		}
	}
	return {
		init: function() {
			$(".logo-wrapper").length && ($(window).width() > 1199 ? $(".halo-header-mobile .logo-wrapper").length && $(".halo-header-mobile .logo-wrapper").appendTo(".halo-header-PC .header-middle-logo") : $(".halo-header-PC .logo-wrapper").length && $(".halo-header-PC .logo-wrapper").appendTo(".halo-header-mobile .header-Mobile-item.text-center .items")), $("#cart-dropdown").length && ($(window).width() > 1199 ? $("#cart-mobile #cart-dropdown").length && $("#cart-mobile #cart-dropdown").appendTo(".item--cart") : $(".item--cart #cart-dropdown").length && $(".item--cart #cart-dropdown").appendTo("#cart-mobile .halo_mobileNavigation_wrapper")), $("[data-section-type='header-section']").length && $("[data-section-type='header-section']").each(function(t) {
				var e = $(this).find("[data-slick]");
				e.length && (e.hasClass("slick-slider") || e.slick())
			}), $("[data-search-dropdown-pc]").on("click", function(t) {
				t.preventDefault();
				const e = $(t.currentTarget);
				e.hasClass("is-open") ? (e.removeClass("is-open"), e.find(".icon-close").hide(), e.find(".icon-search").show(), $(".search-form").hide()) : (e.addClass("is-open"), e.find(".icon-close").show(), e.find(".icon-search").hide(), $(".search-form").show())
			}), $(document).on("click", function(t) {
				$("[data-search-dropdown-pc]").hasClass("is-open") && 0 === $(t.target).closest("[data-search-dropdown-pc]").length && 0 === $(t.target).closest(".search-form").length && ($("[data-search-dropdown-pc]").removeClass("is-open"), $("[data-search-dropdown-pc]").find(".icon-close").hide(), $("[data-search-dropdown-pc]").find(".icon-search").show(), $(".search-form").hide())
			}), $("#login-dropdown").length && ($(window).width() > 1199 ? $("#login-mobile #login-dropdown").length && $("#login-mobile #login-dropdown").appendTo(".item--account .navUser-action") : $(".halo-header-02").length ? $(".navUser-account #login-dropdown").length && $(".navUser-account #login-dropdown").appendTo("#login-mobile .halo_mobileNavigation_wrapper") : $(".item--account #login-dropdown").length && $(".item--account #login-dropdown").appendTo("#login-mobile .halo_mobileNavigation_wrapper")), $(".sub-menu-mobile1 .menu-lv-2").length || $(".wrap-show-more").each(function() {
				var t = $(this).html();
				$(".sub-menu-mobile1 .site-nav-dropdown1").append('<li class="menu-lv-2 hover-lv2 item dropdown">' + t + "</li>")
			}), function() {
				if ($(".halo-header-02").length) if ($(window).width() > 1199) {
					var t = $(".site-header").height();
					$(".banner-image-full-width-sections:first-child .banner-image-full-width").css("margin-top", -t)
				} else $(".banner-image-full-width-sections:first-child .banner-image-full-width").css("margin-top", 0)
			}(), t(), $(".search-form").length && ($(window).width() > 1199 ? $(".item--searchMobile .search-form").length && $(".item--searchMobile .search-form").appendTo(".item--quickSearch") : $(".item--quickSearch .search-form").length && $(".item--quickSearch .search-form").appendTo(".item--searchMobile")), $("#currencies").length && ($(window).width() > 1199 ? $(".navUser-currency .lang_currency-dropdown").length || $(".currency-groups .lang_currency-dropdown").appendTo(".navUser-currency") : $(".navUser-currency .lang_currency-dropdown").length && $(".navUser-currency .lang_currency-dropdown").appendTo(".currency-groups")), $("#lang-switcher").length && ($(window).width() > 1199 ? $(".navUser-language .lang_currency-dropdown").length || $(".lang-groups .lang_currency-dropdown").appendTo(".navUser-language") : $(".navUser-language .lang_currency-dropdown").length && $(".navUser-language .lang_currency-dropdown").appendTo(".lang-groups")), $(".featuredProductCarousel").length && ($(".featuredProductCarousel").hasClass("slick-slider") || $(".featuredProductCarousel").slick({
				infinite: !0,
				slidesToShow: 1,
				slidesToScroll: 1,
				dots: !1,
				autoplay: !1,
				arrows: !0,
				prevArrow: '<div class="slick-prev slick-arrow"><svg class="icon"><use xlink:href="#icon-chevron-left"></svg></div>',
				nextArrow: '<div class="slick-next slick-arrow"><svg class="icon"><use xlink:href="#icon-chevron-right"></svg></div>'
			}), $(".site-nav > li").mouseover(function() {
				$(".featuredProductCarousel").get(0).slick.setPosition()
			}), $("ul.site-nav-mobile > li > .nav-action").on("click", function() {
				$(".featuredProductCarousel").get(0).slick.setPosition()
			})), e(), a($("#currencies"), $("#currencies [data-currency].active"), $("[data-currency-label]")), a($("#lang-switcher"), $("#lang-switcher [data-value].active"), $("[data-language-label]"))
		}
	}
}(), theme.footer = function() {
	return {
		init: function() {
			var t;
			!
			function() {
				if ($(".geotrust_ssl--image[data-slick]").length) {
					var t = $(".geotrust_ssl--image[data-slick]");
					t.length && (t.hasClass("slick-slider") || t.slick())
				}
			}(), function() {
				if ($(".footer-block-icon-row").length) {
					var t = $(".footer-block-icon-row");
					$(window).width() < 1025 ? t.length && (t.hasClass("slick-slider") || t.slick()) : t.length && t.hasClass("slick-slider") && t.slick("unslick")
				}
			}(), $(window).width() <= 768 ? $(".footer-info").hasClass("footerMobile") || ($(".footer-info").addClass("footerMobile"), $(".footer-col--mobile .footer-info-list").css("display", "none")) : ($(".footer-info").removeClass("footerMobile"), $(".footer-col--mobile").removeClass("open-dropdown"), $(".footer-col--mobile .footer-info-list").css("display", "block")), $(".video-btn").click(function() {
				t = $(".video-btn").data("src")
			}), $("#myModal").on("shown.bs.modal", function(e) {
				$("#video").attr("src", t + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0")
			}), $("#myModal").on("hide.bs.modal", function(e) {
				$("#video").attr("src", t)
			})
		}
	}
}(), theme.sidebar = function() {
	function t() {
		$("[data-product-carousel-sidebar]").length && $("[data-product-carousel-sidebar]").each(function(t) {
			var e = $(this).find("[data-slick]");
			e.length && (e.hasClass("slick-slider") || e.slick())
		})
	}
	function e() {
		if (Shopify.queryParams = {}, location.search.length) for (var t, e = 0, a = location.search.substr(1).split("&"); e < a.length; e++)(t = a[e].split("=")).length > 1 && (Shopify.queryParams[decodeURIComponent(t[0])] = decodeURIComponent(t[1]))
	}
	function a(t) {
		var e = $.param(Shopify.queryParams).replace(/%2B/g, "+");
		return t ? "" != e ? t + "?" + e : t : location.pathname + "?" + e
	}
	function i(t) {
		delete Shopify.queryParams.page;
		var e = a(t);
		History.pushState({
			param: Shopify.queryParams
		}, e, e)
	}
	function r(e) {
		$.ajax({
			type: "get",
			url: e,
			beforeSend: function() {
				$(".loading-modal").show()
			},
			success: function(e) {
				!
				function(t) {
					var e = $(".template-collection .page-container"),
						a = e.find(".sidebar_content"),
						i = e.find("#Collection"),
						r = $(t).find(".page-collections"),
						o = r.find(".sidebar_content"),
						n = r.find("#Collection");
					if (a.replaceWith(o), i.replaceWith(n), theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length && $(".spr-badge").length) window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
				}(e), $(".sidebarBlock"), $(".sidebarBlock").each(function() {
					var t = $(this);
					t.find("input:checked").length && t.addClass("show_clear")
				}), $(document).on("click", ".sidebarBlock.show_clear .clear", function(t) {
					t.preventDefault(), t.stopPropagation();
					var e = [],
						a = $(this).parents(".sidebarBlock");
					Shopify.queryParams.constraint && (e = Shopify.queryParams.constraint.split("+")), a.find("input:checked").each(function() {
						var t = $(this).val();
						if (t) {
							var a = e.indexOf(t);
							a >= 0 && e.splice(a, 1)
						}
					}), e.length ? Shopify.queryParams.constraint = e.join("+") : delete Shopify.queryParams.constraint, i()
				}), o(), t()
			},
			error: function(t, e) {
				$(".ajax-error-message").text($.parseJSON(t.responseText).description), showModal(".ajax-error-modal")
			},
			complete: function() {
				$(".loading-modal").hide()
			}
		})
	}
	function o() {
		$(".sidebarBlock_filter .sidebarBlock-content .list-tags").each(function() {
			$(this).children("li").length > 0 ? $(this).parents(".sidebarBlock_filter").show() : $(this).parents(".sidebarBlock_filter").hide()
		})
	}
	return {
		init: function() {
			t(), $(".sidebar_mobile").on("click", function(t) {
				t.preventDefault();
				const e = $(t.target);
				e.hasClass("is-open") ? (e.removeClass("is-open"), $(".page-sidebar").removeClass("is-open"), $("body").removeClass("open_Sidebar")) : (e.addClass("is-open"), $(".page-sidebar").addClass("is-open"), $("body").addClass("open_Sidebar"))
			}), $(".sidebar_close .close").on("click", function(t) {
				t.preventDefault(), $(".page-sidebar").removeClass("is-open"), $("body").removeClass("open_Sidebar")
			}), $(".overlay_background").on("click", function(t) {
				t.preventDefault(), $(".page-sidebar").hasClass("is-open") && ($(".page-sidebar").removeClass("is-open"), $("body").removeClass("open_Sidebar"), $(".sidebar_mobile .icon-filter").removeClass("is-open"), $(".sidebar_mobile .filters-toolbar__label").removeClass("is-open"))
			}), function() {
				$(".all-categories-list").length && $(document).on("click", ".all-categories-list .navPages-action-wrapper", function(t) {
					const e = $(t.target).parent();
					e.siblings().removeClass("is-clicked"), e.toggleClass("is-clicked"), e.siblings().find("> .dropdown-category-list").slideUp("slow"), e.find("> .dropdown-category-list").slideToggle("slow")
				});
				var t = $(".breadcrumb-wrapper ul.breadcrumb .item.is-active").children("a").attr("href");
				$(".all-categories-list .navPages-level-1").each(function() {
					var e = $(this);
					e.find(".navPages-action-wrapper a").attr("href") === t && e.children(".navPages-action-wrapper").trigger("click")
				})
			}(), e(), o(), $(document).on("click", ".sidebarBlock_filter .list-tags a, .list-tags label, .refined .selected-tag", function(t) {
				t.preventDefault(), t.stopPropagation();
				var e = [];
				if (Shopify.queryParams.constraint && (e = Shopify.queryParams.constraint.split("+")), !window.enable_sidebar_multiple_choice && !$(this).prev().is(":checked")) {
					var a, r, o = $(this).closest(".sidebar-tags, .refined-widgets").find("input:checked");
					o.length && (a = o.val()) && (r = e.indexOf(a)) >= 0 && e.splice(r, 1)
				}(a = $(this).prev().val()) && ((r = e.indexOf(a)) >= 0 ? e.splice(r, 1) : e.push(a)), e.length ? Shopify.queryParams.constraint = e.join("+") : delete Shopify.queryParams.constraint, i()
			}), $('.filters-toolbar__item-child[data-select="SortBy"]').find("#SortBy").val(), $("#SortBy").on("change", function(t) {
				var e = $("#SortBy").val(),
					a = window.location.href.replace(window.location.search, "");
				console.log(a), e.length ? Shopify.queryParams.sort_by = e : window.location.href = a, i()
			}), $(".template-collection").length && History.Adapter.bind(window, "statechange", function() {
				History.getState(), e(), r(a())
			}), $(".template-collection").length && $(document).off("click", ".pagination-wrapper .pagination-link").on("click", ".pagination-wrapper .pagination-link", function(t) {
				t.preventDefault();
				var e = $(this).attr("href").match(/page=\d+/g);
				if (e && (Shopify.queryParams.page = parseInt(e[0].match(/\d+/g)), Shopify.queryParams.page)) {
					var i = a();
					History.pushState({
						param: Shopify.queryParams
					}, i, i), r(i);
					var o = $(".template-collection .page-collection");
					o.length || (o = $(".page-container"));
					var n = o.offset().top;
					$("body,html").animate({
						scrollTop: n
					}, 800)
				}
			})
		}
	}
}(), theme.wishlist = function() {
	var t = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];

	function e(t) {
		var e = $("[data-wishlist-container]");
		jQuery.getJSON("/products/" + t + ".js", function(t) {
			var a = "",
				i = theme.Currency.formatMoney(t.price_min, theme.moneyFormat);
			a += '<tr class="wishlist_row" data-wishlist-added="wishlist-' + t.id + '" data-product-id="product-' + t.handle + '">', a += '<th class="wishlist_col wishlist_image text-center">', a += '<a href="' + t.url + '" class="product-grid-image" data-collections-related="/collections/all?view=related">', a += '<img src="' + t.featured_image + '" alt="' + t.featured_image.alt + '">', a += "</a></th>", a += '<th class="wishlist_col wishlist_name text-left">', a += '<div class="product-vendor">', a += '<a href="/collections/vendors?q=' + t.vendor + '" title="' + t.vendor + '">' + t.vendor + "</a></div>", a += '<a class="product-title" href="' + t.url + '" title="' + t.title + '">' + t.title + "</a></th>", a += '<th class="wishlist_col wishlist_price text-center"><div class="product-price"><span class="price-item">' + i + "</span></div></th>", a += '<th class="wishlist_col wishlist_remove text-center"><a class="btn btn--secondary product-remove whislist-added" href="#" data-product-handle="' + t.handle + '" data-icon-wishlist data-id="' + t.id + '">' + theme.strings.remove + "</a></th>", a += '<th class="wishlist_col wishlist_add text-center">', a += '<form action="/cart/add" method="post" class="variants" id="wishlist-product-form-' + t.id + '" data-id="product-actions-' + t.id + '" enctype="multipart/form-data">', t.available ? (1 == t.variants.length && (a += '<button class="btn btn--secondary-accent" type="submit" data-btn-addToCart data-form-id="#wishlist-product-form-' + t.id + '">' + theme.strings.addToCart1 + '</button><input type="hidden" name="id" value="' + t.variants[0].id + '" />'), t.variants.length > 1 && (a += '<a class="btn btn--secondary-accent" title="' + t.title + '" href="' + t.url + '">' + theme.strings.select_options1 + "</a>")) : a += '<button class="btn product-btn product-btn-soldOut" type="submit" disabled>' + theme.strings.unavailable + "</button>", a += "</form></th>", a += "</tr>", e.append(a);
			var r = $(".wrapper-wishlist a.share").attr("href");
			r += encodeURIComponent(t.title + "\nPrice: " + i.replace(/(<([^>]+)>)/gi, "") + "\nLink: " + window.location.protocol + "//" + window.location.hostname + t.url + "\n\n"), $(".wrapper-wishlist a.share").attr("href", r), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
		})
	}
	function a() {
		var t = JSON.parse(localStorage.getItem("items")),
			e = $("#wishlist_pagination"),
			a = '<li><a href="#" class="btn btn--narrow btn--prev disabled"><span class="icon_text">' + theme.strings.previous + "</span></a></li>",
			i = $("[data-wishlist-container]");
		e.children().remove();
		var r = Math.ceil(t.length / 5);
		if (r <= 1) i.children().show();
		else {
			for (var o = 0; o < r; o++) {
				var n = o + 1;
				a += 0 === o ? '<li><a class="pagination-link pagination--current" data-page="' + n + '" href="' + n + '" title="' + n + '">' + n + "</a></li>" : '<li><a class="pagination-link" data-page="' + n + '" href="' + n + '" title="' + n + '">' + n + "</a></li>"
			}
			a += '<li><a class="btn btn--narrow btn--next" href="#"><span class="icon_text">' + theme.strings.next + "</span></a></li>", e.append(a), i.children().each(function(t, e) {
				t >= 0 && t < 5 ? $(e).show() : $(e).hide()
			}), e.off("click.wl-pagging").on("click.wl-pagging", "li a", function(t) {
				t.preventDefault();
				var a = $(this).hasClass("btn--prev"),
					o = $(this).hasClass("btn--next"),
					n = $(this).data("page");
				if (a) {
					var s = parseInt($("#wishlist_pagination").find(".pagination--current").data("page"));
					n = s - 1
				}
				if (o) {
					s = parseInt($("#wishlist_pagination").find(".pagination--current").data("page"));
					n = s + 1
				}
				i.children().each(function(t, e) {
					t >= 5 * (n - 1) && t < 5 * n ? $(e).show() : $(e).hide()
				}), 1 === n ? (e.find(".btn--prev").addClass("disabled"), e.find(".btn--next").removeClass("disabled")) : n === r ? (e.find(".btn--next").addClass("disabled"), e.find(".btn--prev").removeClass("disabled")) : (e.find(".btn--prev").removeClass("disabled"), e.find(".btn--next").removeClass("disabled")), $("#wishlist_pagination").find(".pagination-link").removeClass("pagination--current"), $("#wishlist_pagination").find('[data-page="' + n + '"]').addClass("pagination--current")
			})
		}
	}
	function i() {
		$(document).off("click.addOrRemoveWishlist", "[data-icon-wishlist]").on("click.addOrRemoveWishlist", "[data-icon-wishlist]", function(i) {
			i.preventDefault();
			var r = $(this),
				o = r.data("id"),
				n = r.data("product-handle"),
				s = t.indexOf(n);
			r.hasClass("whislist-added") ? (r.removeClass("whislist-added"), $('[data-wishlist-added="wishlist-' + o + '"]').length && $('[data-wishlist-added="wishlist-' + o + '"]').remove(), t.splice(s, 1), localStorage.setItem("items", JSON.stringify(t)), $("[data-wishlist-container]").length && a()) : (r.addClass("whislist-added"), $("[data-wishlist-container]").length && e(n), t.push(n), localStorage.setItem("items", JSON.stringify(t))), function(e) {
				var a = $('[data-product-handle="' + e + '"]');
				t.indexOf(e) >= 0 ? a.addClass("whislist-added") : a.removeClass("whislist-added")
			}(n)
		})
	}
	return localStorage.setItem("items", JSON.stringify(t)), t.length && (t = JSON.parse(localStorage.getItem("items"))), theme.product_card.init(), {
		init: function() {
			!
			function() {
				var t = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : [];
				if (t.length) for (var e = 0; e < t.length; e++) $('[data-product-handle="' + t[e] + '"]').addClass("whislist-added")
			}(), function() {
				if ("undefined" != typeof Storage && $(".page").hasClass("page-wishlist")) {
					var t = JSON.parse(localStorage.getItem("items"));
					if (t.length <= 0) return;
					t.forEach(function(t) {
						e(t)
					}), setTimeout(function() {
						a()
					}, 1e3)
				}
			}(), i()
		}
	}
}(), theme.compare = function() {
	var t = localStorage.getItem("compareArr") ? JSON.parse(localStorage.getItem("compareArr")) : [];

	function e(t) {
		var e = $("[data-compare-modal]").find(".product-grid"),
			a = $("[data-compare-modal]").find(".rating"),
			i = $("[data-compare-modal]").find(".description"),
			r = ($("[data-compare-modal]").find(".collection"), $("[data-compare-modal]").find(".availability")),
			o = $("[data-compare-modal]").find(".product-type"),
			n = $("[data-compare-modal]").find(".product-sku");
		compareOption1 = $("[data-compare-modal]").find(".option1"), compareOption2 = $("[data-compare-modal]").find(".option2"), compareOption3 = $("[data-compare-modal]").find(".option3"), jQuery.getJSON("/products/" + t + ".js", function(t) {
			var s = "",
				c = "",
				d = "",
				l = "",
				p = "",
				u = "",
				h = "",
				m = "",
				f = (theme.Currency.formatMoney(t.price_min, theme.moneyFormat), '<span class="shopify-product-reviews-badge" data-id="' + t.id + '"></span>'),
				v = t.description.substring(0, 100) + "...",
				g = (d = (new DOMParser).parseFromString(v, "text/html"), (t.variants[0].compare_at_price - t.variants[0].price) / t.variants[0].compare_at_price * 100),
				b = t.tags,
				w = Math.floor(g);
			$(this).find(".product-card").data("id");
			c += "" == f || null == f ? '<div class="col-xl-4" data-compare-added="compare-' + t.id + '"></div>' : '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">' + f + "</div>", a.append(c), d += "" == v || null == v ? '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">-</div>' : '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">' + v + "</div>", i.append(d);
			var _ = t.variants;
			_.length > 1 ? $.each(_, function(e, a) {
				0 == e && (skuValue = a.sku, "" == skuValue ? (skuValueHTML = '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">-</div>', u += skuValueHTML) : (skuValueHTML = '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">' + skuValue + "</div>", u += skuValueHTML))
			}) : u += '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">-</div>', n.append(u);
			var y = t.options;
			$.each(y, function(e, a) {
				var i = a.position,
					r = a.name.toLowerCase(),
					o = a.values,
					n = "";
				o.forEach(function(t, e) {
					t && (e > 0 && (n += ", "), n += t)
				}), m += '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">-</div>', h += "" == n || "Default Title" == n ? '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">-</div>' : '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">' + n + "</div>";
				var s = window.option_ptoduct1,
					c = window.option_ptoduct2;
				optionThreeValue = window.option_ptoduct3, 1 == i && (r == s ? (compareOption1.append(h), compareOption2.append(m), compareOption3.append(m)) : r == c ? (compareOption1.append(m), compareOption2.append(h), compareOption3.append(m)) : "title" == r ? (compareOption1.append(m), compareOption2.append(m), compareOption3.append(m)) : (compareOption1.append(m), compareOption2.append(m), compareOption3.append(h))), 2 == i && (r == s ? compareOption1.find('[data-compare-added="compare-' + t.id + '"]').html(n) : r == c ? compareOption2.find('[data-compare-added="compare-' + t.id + '"]').html(n) : compareOption3.find('[data-compare-added="compare-' + t.id + '"]').html(n)), 3 == i && (r == s ? compareOption1.find('[data-compare-added="compare-' + t.id + '"]').html(n) : r == c ? compareOption2.find('[data-compare-added="compare-' + t.id + '"]').html(n) : compareOption3.find('[data-compare-added="compare-' + t.id + '"]').html(n))
			}), s += '<div class="grid-item col-xl-4" data-compare-added="compare-' + t.id + '">', s += '<div class="product-card" data-product-id="product-' + t.handle + '">', s += '<div class="product-image">', s += '<a href="' + t.url + '" class="product-link">', s += '<img src="' + t.featured_image + '" alt="' + t.featured_image.alt + '">', s += "</a>", s += '<div class="product_badges">', t.compare_at_price > t.price && ("text" == window.label_sale ? s += '<div class="badge sale-badge">' + theme.strings.sale + " </div>" : s += '<div class="badge sale-badge">- ' + w + "% </div>"), 0 == t.available && (s += '<div class="badge soldOut-badge">' + theme.strings.soldOut + " </div>"), b.forEach(function(t) {
				"new" != t && "New" != t || (s += '<div class="badge new-badge">' + theme.strings.new + " </div>"), "bundle" != t && "bundle" != t || (s += '<div class="badge bundle-badge">' + theme.strings.bundle + " </div>")
			}), s += "</div></div>", s += '<div class="product-content">', s += '<div class="product-vendor">', s += '<a href="/collections/vendors?q=' + t.vendor + '" title="' + t.vendor + '">' + t.vendor + "</a></div>", s += '<h4 class="product-title"><a href="' + t.url + '" title="' + t.title + '">' + t.title + "</a></h4>", t.compare_at_price > t.price ? (s += '<div class="product-price price--on-sale">', s += '<span class="price-item price-item--regular">' + Shopify.formatMoney(t.variants[0].compare_at_price, window.money_format) + "</span>", s += '<span class="price-item price-item--sale" itemprop="price"> ' + Shopify.formatMoney(t.price, window.money_format) + "</span>", s += "</div>") : s += '<div class="product-price">' + Shopify.formatMoney(t.price, window.money_format) + "</div>", s += '<div class="product-action">', s += '<form action="/cart/add" method="post" class="variants" id="-' + t.id + '" data-id="product-actions-' + t.id + '" enctype="multipart/form-data">', t.available ? (1 == t.variants.length && (s += '<button data-btn-addToCart class="btn product-btn" type="submit" data-form-id="#-' + t.id + '">' + theme.strings.addToCart + '</button><input type="hidden" name="id" value="' + t.variants[0].id + '" />'), t.variants.length > 1 && (s += '<a class="btn product-btn" title="' + t.title + '" href="' + t.url + '">' + theme.strings.select_options + "</a>"), l += '<div class="col-xl-4 in-stock" data-compare-added="compare-' + t.id + '">' + theme.strings.in_stock + "</div>") : (s += '<button data-btn-addToCart class="btn product-btn product-btn-soldOut" type="submit" disabled="disabled">' + theme.strings.unavailable + "</button>", l += '<div class="col-xl-4 unavailable" data-compare-added="compare-' + t.id + '">' + theme.strings.out_of_stock + "</div>"), s += '</form><div class="text-center mt-3"><a class="product-remove" href="javascript:void(0);" data-icon-compare-added data-compare-product-handle="' + t.handle + '" data-id="' + t.id + '">' + theme.strings.remove + "</a></div>", s += "</div></div></div></div>", e.append(s), p += '<div class="col-xl-4" data-compare-added="compare-' + t.id + '">' + t.type + "</div>", r.append(l), o.append(p), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
		})
	}
	function a(e) {
		var a = $('[data-compare-product-handle="' + e + '"]'),
			i = t.indexOf(e),
			r = $("[data-compare-count]");
		compareItems = localStorage.getItem("compareArr") ? JSON.parse(localStorage.getItem("compareArr")) : [], totalProduct = Math.ceil(compareItems.length), i >= 0 ? (a.addClass("compare-added"), a.find(".compare-text").text("remove compare")) : (a.removeClass("compare-added"), a.find(".compare-text").text("add compare")), r.text(totalProduct), totalProduct > 1 ? r.parent().addClass("show") : r.parent().removeClass("show")
	}
	function i() {
		if ($(".page-collections").length) {
			$("[data-compare-modal]").find(".product-grid"), $("[data-compare-message-modal]");
			$(document).off("click.compareSelected", "[data-compare-selected]").on("click.compareSelected", "[data-compare-selected]", function(e) {
				e.preventDefault(), e.stopPropagation(), "undefined" != typeof Storage ? t.length <= 1 || (t.forEach(function(e) {
					$(document).off("click.removeCompareItem", "[data-icon-compare-added]").on("click.removeCompareItem", "[data-icon-compare-added]", function(e) {
						e.preventDefault(), e.stopPropagation();
						var i = $(this),
							r = i.data("id"),
							o = i.data("compare-product-handle"),
							n = t.indexOf(o);
						$('[data-compare-added="compare-' + r + '"]').length && $('[data-compare-added="compare-' + r + '"]').remove(), t.splice(n, 1), localStorage.setItem("compareArr", JSON.stringify(t)), a(o)
					})
				}), compareCountNum = $("[data-compare-count]"), compareElm = $("[data-icon-compare]"), $(document).off("click.removeAllCompareItem", "[data-compare-remove-all]").on("click.removeAllCompareItem", "[data-compare-remove-all]", function(e) {
					e.preventDefault(), e.stopPropagation(), $("[data-compare-added]").remove(), t.splice(0, t.length), localStorage.setItem("compareArr", JSON.stringify(t)), compareElm.hasClass("compare-added") && compareElm.removeClass("compare-added"), totalProduct = Math.ceil(t.length), compareCountNum.text("0"), compareCountNum.parent().removeClass("show"), $("#compare").modal("hide")
				})) : alert("Sorry! No web storage support..")
			})
		}
	}
	return localStorage.setItem("compareArr", JSON.stringify(t)), t.length && (t = JSON.parse(localStorage.getItem("compareArr"))), {
		init: function() {
			$(".page-collections").length && $(document).on("click", "[data-icon-compare]", function(i) {
				i.preventDefault();
				var r = $(this),
					o = r.data("id"),
					n = r.data("compare-product-handle"),
					s = t.indexOf(n);
				r.hasClass("compare-added") ? (r.removeClass("compare-added"), $('[data-compare-added="compare-' + o + '"]').length && $('[data-compare-added="compare-' + o + '"]').remove(), t.splice(s, 1), localStorage.setItem("compareArr", JSON.stringify(t))) : (r.addClass("compare-added"), t.push(n), localStorage.setItem("compareArr", JSON.stringify(t)), e(n)), a(n)
			}), function() {
				if ($(".page-collections").length) {
					var i = $("[data-compare-count]");
					if (totalProduct = Math.ceil(t.length), i.text(totalProduct), t.length) {
						for (var r = 0; r < t.length; r++) $('[data-compare-product-handle="' + t[r] + '"]').addClass("compare-added");
						if ("undefined" != typeof Storage) {
							if (t.length <= 0) return;
							setTimeout(function() {
								t.forEach(function(t) {
									e(t), a(t)
								})
							}, 700)
						} else alert("Sorry! No web storage support..")
					}
				}
			}(), i()
		}
	}
}(), theme.cart_page = function() {
	$(".page-cart").length && ($("[data-qtt]"), $(document).on("click", "[data-qtt]", function(t) {
		t.preventDefault(), t.stopPropagation();
		var e = $(this),
			a = e.siblings('input[name="quantity"]').length > 0 ? e.siblings('input[name="quantity"]') : e.siblings('input[name="group_quantity"]');
		a.length < 1 && (a = e.siblings('input[name="updates[]"]'));
		var i = parseInt(a.val());
		switch (!0) {
		case e.hasClass("plus"):
			i += 1;
			break;
		case e.hasClass("minus") && i > 0:
			i -= 1
		}
		a.val(i)
	}))
}(), theme.someone_purchased = function() {
	function t() {
		$(".product-notification .time-text span:visible").text();
		if ($(".product-notification").hasClass("active")) $(".product-notification").removeClass("active");
		else {
			var t = $(".data-product").length,
				e = Math.floor(Math.random() * t),
				a = $(".product-notification .data-product:eq(" + e + ")").data("image"),
				i = $(".product-notification .data-product:eq(" + e + ")").data("title"),
				r = $(".product-notification .data-product:eq(" + e + ")").data("url"),
				o = $(".product-notification .data-product:eq(" + e + ")").data("local");
			$(".product-notification").addClass("active"), $(".product-notification .product-image").find("img").attr("src", a), $(".product-notification .product-name").attr("href", r), $(".product-notification .product-name").text(i), $(".product-notification .product-image").attr("href", r), $(".product-notification .time-text").text(o)
		}
	}
	return {
		init: function() {
			!
			function() {
				var t = $("#accept-cookies");
				"closed" == $.cookie("cookieMessage") ? t.remove() : t.removeClass("hide"), t.find("[data-accept-cookie]").on("click", function(e) {
					e.preventDefault(), t.remove(), $.cookie("cookieMessage", "closed", {
						expires: 1,
						path: "/"
					})
				})
			}(), function() {
				if ($(".product-notification").length) {
					"closed" == $.cookie("pr_notification") && $(".product-notification").remove(), $(".close-notifi").bind("click", function() {
						$(".product-notification").remove(), $.cookie("pr_notification", "closed", {
							expires: 1,
							path: "/"
						})
					});
					var e = $(".product-notification").data("time");
					setInterval(t, e)
				}
			}()
		}
	}
}(), theme.halo_mobile = function() {
	function t() {
		$("#site-nav-mobile").find(".is-open").removeClass("is-open"), $("#site-nav-mobile").find(".is-hidden").removeClass("is-hidden")
	}
	return {
		init: function() {
			$('[data-mobile-menu-toggle="menu"]').on("click", function() {
				if ($(this).toggleClass("is-open"), $("body").toggleClass("open_menu")) {
					var t = $(".site-header").position(),
						e = $(".site-header").outerHeight();
					$("#site-nav-mobile").css({
						top: t.top + e,
						height: $(window).height() - t.top - e
					})
				}
               $(".header-Mobile-item.text-right .item--searchMobile,.header-Mobile-item.text-right .item--cart,.header-Mobile-item.text-right .item--account").toggle();
              
			}), $("#site-nav-mobile .close_menu").on("click", function(e) {
				$('[data-mobile-menu-toggle="menu"]').removeClass("is-open"), $("body").removeClass("open_menu"), t()
			}), $(".overlay_background").on("click", function(e) {
				$("body").hasClass("open_menu") && ($('[data-mobile-menu-toggle="menu"]').removeClass("is-open"), $("body").removeClass("open_menu"), t())
			}), $("[data-login-dropdown-pc]").on("click", function(t) {
				t.preventDefault();
				const e = $(t.currentTarget);
				e.hasClass("is-open") ? (e.removeClass("is-open"), $("#login-dropdown").slideUp()) : (e.addClass("is-open"), $("#login-dropdown").slideDown())
			}), $("[data-close-login-dropdown-pc]").on("click", function(t) {
				t.preventDefault(), $("[data-login-dropdown-pc]").removeClass("is-open"), $("#login-dropdown").slideUp()
			}), $(document).on("click", function(t) {
				$("[data-login-dropdown-pc]").hasClass("is-open") && 0 === $(t.target).closest("[data-login-dropdown-pc]").length && 0 === $(t.target).closest("#login-dropdown").length && ($("[data-login-dropdown-pc]").removeClass("is-open"), $("#login-dropdown").slideUp())
			}), $("[data-login-toggle]").on("click", function(t) {
				$("body").addClass("open_Account")
			}), $("[data-close-login-dropdown]").on("click", function(t) {
				$("body").removeClass("open_Account")
			}), $(".overlay_background").on("click", function(t) {
				t.preventDefault(), $("body").hasClass("open_Account") && $("body").removeClass("open_Account")
			}), $(".item--searchMobile .navUser-action").on("click", function(t) {
				$(".item--searchMobile .navUser-action").toggleClass("is-open")
			}), $(".terms_conditions_wrapper").length && ($('.terms_conditions_wrapper input[type="checkbox"]').each(function() {
				$(this).is(":checked") ? $(this).parent().next().removeClass("disabled") : $(this).parent().next().addClass("disabled")
			}), $(document).on("click", ".terms_conditions_wrapper .title", function(t) {
				t.preventDefault();
				var e = $(this),
					a = e.prev();
				a.prop("checked") ? (a.prop("checked", !1), e.parent().next().addClass("disabled")) : (a.prop("checked", !0), e.parent().next().removeClass("disabled"))
			})), $(document).on("click", ".site-nav-mobile .nav-action", function(t) {
				const e = $(t.target).parent(), a = e.siblings(), i = e.closest(".site-nav-dropdown"), r = i.siblings();
				$(t.target).hasClass("menu__moblie_end") || $(t.target).hasClass("link") || (e.addClass("is-open"), e.hasClass("is-open") && a.addClass("is-hidden"), i.length && r.addClass("is-hidden"))
			}), $(document).on("click", ".site-nav-mobile .menu-mb-title", function(t) {
				const e = $(t.target).closest(".dropdown"), a = e.siblings(), i = $(t.target).closest(".site-nav-dropdown").siblings();
				e.removeClass("is-open"), a.removeClass("is-hidden"), i.removeClass("is-hidden")
			}), $(".footerMobile .footer-col--mobile .footer-info-heading").on("click", function() {
				$(this).parent().toggleClass("open-dropdown"), $(this).parent().find(".footer-info-list").slideToggle()
			})
		}
	}
}(), theme.instagram = function() {
	return {
		init: function() {
			!
			function() {
				if ($(".home-instagram .instagram-load-more").length) {
					var t, e;
					if ($(window).width() > 1024) for ($(".home-instagram .item__ins").length <= 7 && $(".home-instagram .instagram-load-more").hide(), t = 1; t <= 7; t++) $(".home-instagram .item__ins:nth-child(" + t + ")").removeClass("hide");
					else if ($(window).width() > 767) for (t = 1; t <= 3; t++) $(".home-instagram .item__ins:nth-child(" + t + ")").removeClass("hide");
					else for (t = 1; t <= 4; t++) $(".home-instagram .item__ins:nth-child(" + t + ")").removeClass("hide");
					$(document).on("click", ".home-instagram .instagram-load-more", function() {
						for (e = t, $(window).width() > 1024 ? t += 4 : t += 3; e <= t; e++) $(".home-instagram .item__ins:nth-child(" + e + ")").removeClass("hide");
						$(".home-instagram .item__ins.hide").length || $(".home-instagram .instagram-load-more").remove()
					}), $('[data-fancybox="images-instagram"]').fancybox({
						mobile: {
							clickContent: "close",
							clickSlide: "close"
						},
						buttons: ["zoom", "slideShow", "close"],
						animationEffect: "zoom-in-out",
						transitionEffect: "zoom-in-out",
						transitionDuration: 800
					})
				}
			}(), function() {
				if ($(".home-instagram-2 .instagram-load-more-2").length) {
					var t, e;
					if ($(window).width() > 1024) for (t = 1; t <= 6; t++) $(".home-instagram-2 .item__ins:nth-child(" + t + ")").removeClass("hide");
					else if ($(window).width() > 767) for (t = 1; t <= 3; t++) $(".home-instagram-2 .item__ins:nth-child(" + t + ")").removeClass("hide");
					else for (t = 1; t <= 4; t++) $(".home-instagram-2 .item__ins:nth-child(" + t + ")").removeClass("hide");
					$(document).on("click", ".home-instagram-2 .instagram-load-more-2", function() {
						for (e = t, $(window).width() > 1024 ? t += 4 : t += 3; e <= t; e++) $(".home-instagram-2 .item__ins:nth-child(" + e + ")").removeClass("hide");
						$(".home-instagram-2 .item__ins.hide").length || $(".home-instagram-2 .instagram-load-more-2").remove()
					}), $('[data-fancybox="images-instagram"]').fancybox({
						mobile: {
							clickContent: "close",
							clickSlide: "close"
						},
						buttons: ["zoom", "slideShow", "close"],
						animationEffect: "zoom-in-out",
						transitionEffect: "zoom-in-out",
						transitionDuration: 800
					})
				}
			}()
		}
	}
}(), theme.lookbook = function() {
	return {
		init: function() {
			$(".lookbook__points-popup .point").on("click", function() {
				if ($(".lookbook__points-popup").hasClass("check_append")) $(".lookbook__popup").removeClass("is-open"), $(".lookbook__popup .custom-product-card").appendTo(".lookbook__points-popup.check_append"), $(".lookbook__points-popup.check_append").removeClass("check_append");
				else if ($(this).parent().hasClass("check_append")) $(".lookbook__popup").removeClass("is-open"), $(".lookbook__popup .custom-product-card").appendTo(".lookbook__points-popup.check_append"), $(".lookbook__points-popup.check_append").removeClass("check_append");
				else {
					$(".lookbook__popup .custom-product-card").remove();
					var t = $(this).parent(),
						e = t.offset(),
						a = $(this).siblings(),
						i = $(".lookbook").offset();
					$(window).width() < 1024 ? $(".lookbook__popup").css({
						top: 30,
						left: 20
					}) : $(".lookbook__popup").css({
						top: e.top - i.top - 100,
						left: e.left - i.left + 40
					}), $(".lookbook__popup").addClass("is-open"), t.addClass("check_append"), a.appendTo(".lookbook__popup")
				}
			}), $(".lookbook__popup .close").on("click", function() {
				$(".lookbook__popup").removeClass("is-open"), $(".lookbook__popup .custom-product-card").appendTo(".lookbook__points-popup.check_append"), $(".lookbook__points-popup.check_append").removeClass("check_append")
			}), $(document).on("click", function(t) {
				0 === $(t.target).closest(".lookbook__popup").length && 0 === $(t.target).closest(".lookbook__points-popup .point").length && ($(".lookbook__popup").removeClass("is-open"), $(".lookbook__popup .custom-product-card").appendTo(".lookbook__points-popup.check_append"), $(".lookbook__points-popup.check_append").removeClass("check_append"))
			}), $("[data-section-type='lookbook-section'] [data-slick]").each(function(t) {
				var e = $(this);
				e.length && (e.hasClass("slick-slider") || e.slick())
			})
		}
	}
}(), theme.ProductTab = function() {
	function t(t, e, a, i) {
		$.ajax({
			type: "get",
			url: window.router + t,
			cache: !1,
			data: {
				view: "json",
				limit: "&" + i
			},
			beforeSend: function() {},
			success: function(i) {
				if (e.remove(), "/collections/?view=json" == t);
				else if (a.html($(i).html()), (r = a).length && (r.hasClass("slick-slider") ? r.slick("setPosition") : r.slick()), (window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency) && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format"), $(".shopify-product-reviews-badge").length && $(".spr-badge").length) return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges();
				var r
			},
			complete: function() {},
			error: function(t, a) {
				e.text("Sorry, there are no products in this collection").show()
			}
		})
	}
	function e(t, e) {
		t.hide(700), !t.find('input[name="dismiss"]').prop("checked") && t.find('input[name="dismiss"]').length || $.cookie("emailSubcribeModal", "closed", {
			expires: e,
			path: "/"
		})
	}
	return {
		init: function() {
			setTimeout(function() {
				$("[data-section-type='collection-tabs']").each(function(e) {
					var a = $(this),
						i = a.find(".nav-tabs").find(".nav-link"),
						r = a.find(".tab-pane"),
						o = a.find(".nav-tabs .nav-link.active"),
						n = a.find(".nav-tabs").data("row"),
						s = a.find(".tab-content .tab-pane.active");
					t(o.data("href"), s.find(".halo-loading"), s.find(".halo-row"), n), i.on("click", function(e) {
						if (e.preventDefault(), e.stopPropagation(), !$(this).hasClass("active")) {
							i.removeClass("active"), r.removeClass("active").removeClass("show");
							var a = $(this),
								o = $(a.attr("href"));
							a.addClass("active"), o.addClass("active show"), o.find(".halo-loading").length && t(a.data("href"), o.find(".halo-loading"), o.find(".halo-row"), n)
						}
					})
				})
			}, 4500), function() {
				if ($("#halo_newsletter").length) {
					var t = $("#halo_newsletter"),
						a = t.find(".popup-overlay"),
						i = t.find(".close"),
						r = $(".newsletterPopup").data("delay"),
						o = $(".newsletterPopup").data("expire");
					t.find(".newsletterPopup"), "closed" != $.cookie("emailSubcribeModal") && setTimeout(function() {
						t.show(700)
					}, r), i.on("click", function(a) {
						a.preventDefault(), e(t, o)
					}), a.on("click", function(a) {
						a.preventDefault(), e(t, o)
					}), $("#mc_embed_signup form").submit(function() {
						"" != $("#mc_embed_signup .email").val() && e(t, o)
					})
				}
			}()
		}
	}
}(), theme.HaloAddOn = {
	init: function() {
		this.progressBarShipping(), this.updateVariant()
	},
	progressBarShipping: function() {
		if ($(".cart__progress_bar").length) {
			var t = 100 * parseInt(theme.strings.priceFreeShipping);
			$.getJSON("/cart.js").then(function(e) {
				var a = e.total_price,
					i = t - a,
					r = Math.floor(100 * a / t);
				if (r > 100 && (r = 100), 100 == r) {
					var o = '<div class="progress"><div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" style="width:' + r + '%" aria-valuenow="' + r + '" aria-valuemin="0" aria-valuemax="100">' + r + "%</div></div>";
					$(".progress_bar_shipping").addClass("success"), $(".progress_bar_shipping").html(o), $(".progress_bar_shipping_message").html(theme.strings.freeShipping)
				} else {
					o = r < 50 ? '<div class="progress"><div class="progress-bar progress-bar-striped bg-danger progress-bar-animated" role="progressbar" style="width:' + r + '%" aria-valuenow="' + r + '" aria-valuemin="0" aria-valuemax="100">' + r + "%</div></div>" : '<div class="progress"><div class="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar" style="width:' + r + '%" aria-valuenow="' + r + '" aria-valuemin="0" aria-valuemax="100">' + r + "%</div></div>";
					var n = theme.Currency.formatMoney(i, theme.moneyFormat);
					$(".progress_bar_shipping").removeClass("success"), $(".progress_bar_shipping").html(o), $(".progress_bar_shipping_message").html(theme.strings.shippingMessage.replace("[price]", n))
				}
				theme.HaloAddOn.checkNeedToConvertCurrency() && Currency.convertAll(window.shop_currency, $("#currencies .active").attr("data-currency"), "span.money", "money_format")
			})
		}
	},
	updateVariant: function() {
		$(".product-card__variant").length && $(document).on("click", ".product-card__variant .product-card__variant--item label", function() {
			var t = $(this),
				e = t.parents(".product-card"),
				a = (t.data("name"), t.data("image"));
			$(".product-card__variant .product-card__variant--item label").removeClass("active"), t.addClass("active"), "" != a && e.find(".product-card__img").attr("src", a)
		})
	},
	showLoading: function() {
		$(".loading-modal").show()
	},
	hideLoading: function() {
		$(".loading-modal").hide()
	},
	checkNeedToConvertCurrency: function() {
		return window.show_multiple_currencies && Currency.currentCurrency != shopCurrency || window.show_auto_currency
	}
}, $(document).ready(function() {
	var t = new theme.Sections;
	t.register("cart-template", theme.Cart), t.register("product", theme.Product), t.register("collection-template", theme.Filters), t.register("product-template", theme.Product), t.register("map", theme.Maps), t.register("video-section", theme.VideoSection), t.register("product-recommendations", theme.ProductRecommendations), t.register("slideshow-section", theme.SlideshowSection), t.register("cart-page", theme.cart_page), theme.header.init(), theme.footer.init(), theme.sidebar.init(), theme.wishlist.init(), theme.compare.init(), theme.HaloAddOn.init(), theme.collection.init(), theme.halo_mobile.init(), theme.product_card.init(), theme.product_sticky_atc.init(), theme.someone_purchased.init(), theme.products_frequently_by_together.init(), theme.product_quickview.init(), theme.homepage_section.init(), theme.instagram.init(), theme.lookbook.init(), theme.ProductTab.init(), $(window).resize(function() {
		theme.header.init(), theme.footer.init(), theme.product_card.init(), theme.homepage_section.init()
	})
}), theme.init = function() {
	theme.customerTemplates.init();
	slate.rte.wrapTable({
		$tables: $(".rte table,.custom__item-inner--html table"),
		tableWrapperClass: "scrollable-wrapper"
	});
	slate.rte.wrapIframe({
		$iframes: $('.rte iframe[src*="youtube.com/embed"],.rte iframe[src*="player.vimeo"],.custom__item-inner--html iframe[src*="youtube.com/embed"],.custom__item-inner--html iframe[src*="player.vimeo"]'),
		iframeWrapperClass: "video-wrapper"
	}), slate.a11y.pageLinkFocus($(window.location.hash)), $(".in-page-link").on("click", function(t) {
		slate.a11y.pageLinkFocus($(t.currentTarget.hash))
	}), $('a[href="#"]').on("click", function(t) {
		t.preventDefault()
	}), slate.a11y.accessibleLinks({
		messages: {
			newWindow: theme.strings.newWindow,
			external: theme.strings.external,
			newWindowExternal: theme.strings.newWindowExternal
		},
		$links: $("a[href]:not([aria-describedby], .product-single__thumbnail)")
	}), theme.FormStatus.init(), $(selectors.image + ".lazyloaded").closest(selectors.imageWithPlaceholderWrapper).find(selectors.imagePlaceholder).addClass(classes.hidden);
	var t = document.querySelectorAll("svg[data-src]");
	SVGInjector(t)
}, $(theme.init);



// mobile header menu toggle
$("#site-nav .menu-lv-1 .menu__moblie,#site-nav .menu-lv-2 .menu__moblie").on("click",function(){
  if($(this).hasClass("active")){
    $(this).removeClass("active");
  }else{
    $(this).addClass("active");
  }
  $(this).siblings().slideToggle();
});


// product tab slide
$(document).ready(function(){
  if($('body .product-diver-seciton').length>0){
    $('.product-diver-seciton').each(function(i,k){
      let that=this;
      $(that).addClass(`product-diver-seciton-${i}`);
      $(that).nextAll('.shopify-section').each(function(){
        let that2=this;
        if($(that2).hasClass('product-diver-seciton')){
          return false;
        }
        else{
          $(that).find('.product-diver-container').append($(that2));
        }    
      })
    })
  }
})


$('.product-tab-container .item').click(function(){
  let index=$(this).index();
  $(this).addClass('active').siblings().removeClass('active');
  $("html, body").animate({
    scrollTop:$(`.product-diver-seciton-${index}`).offset().top -$('.product-tab-container').outerHeight(true)
  }, 500);
  return false;
})


$('.ptcc-btn').click(function(){
  let id=$(this).data('id');
  $(`#AddToCart--${id}`).trigger("click");
  setTimeout(function() {
    $('.ptcc-btn').text("Added to Cart");
  }, 1000);
})



$(window).resize(function() {
  if($(window).width() > 1199){
     $(".halo_mobileNavigation_wrapper #site-nav").appendTo(".halo-header-01 .halo-header-PC .header-middle .container .header-middle-menu");
     document.getElementById("site-nav").className = "site-nav";
    }
});