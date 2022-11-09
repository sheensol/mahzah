
$("#cr_add_section_options").repeater({
    initEmpty: !1,
    defaultValues: {
        "text-input": "foo"
    },
    show: function() {
        $(this).slideDown(), t()
    },
    hide: function(e) {
        $(this).slideUp(e)
    }
})
