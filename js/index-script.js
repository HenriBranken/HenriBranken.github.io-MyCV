let darkColor = "rgba(49, 44, 45, 1)";
let lightColor = "rgba(235, 206, 152, 1)";
let goldColor = "rgba(210, 142, 83, 1)";
let pinkColor = 'rgba(213, 165, 154, 1)';  

$(function () {

    /* BACK-TO-TOP BUTTON ------------------------------------------------------------------*/
    let $window = $(window);
    let $backToTop = $('body.about-me div.back-to-top');
    $window.on('scroll', function () {
        if ($window.scrollTop() >= 200) {
            $backToTop.fadeIn(700);
        }
        else {
            $backToTop.fadeOut(700);
        }
    });

    /* ACCORDION ----------------------------------------------------------------------------*/
    // Caching the DOM.
    $accordion = $('div.myAccordion');
    $accordionEntities = $('div.myAccordion').find('div.yyyy-entry');
    $accHeadings = $('div.myAccordion').find('div.yyyy-heading');
    $accDescriptions = $('div.myAccordion').find('div.yyyy-description');

    // Close a panel of the Accordion if another panel is opened, or if existing panel is closed.
    function revertAccordion($heading, $icon, $panelAffected, $entity) {
        $heading.animate({ 'background-color': 'rgba(0, 0, 0, 0)' }, 300)
            .removeClass('active');

        $icon.removeClass('fa-minus-circle')
            .addClass('fa-plus-circle');

        $panelAffected.slideUp(300, function () {
            $(this).removeClass('active');
        });

        $entity.removeClass('active');
    }

    // Open up a panel of the Accordion once clicked.
    function triggerAccordion($heading, $icon, $panelAffected, $entity) {
        $heading.animate({ 'background-color': 'rgba(210, 142, 83, 1)' }, 300)
            .addClass('active');

        $icon.removeClass('fa-plus-circle')
            .addClass('fa-minus-circle');

        $panelAffected.slideDown(300)
            .fadeIn(300)
            .css({ 'background-color': 'rgba(210, 142, 83, 0.5)' })
            .addClass('active');

        $entity.addClass('active');
    }

    // Revert the Accordion back to its original, closed state.
    function wipeAccordion() { // Relies on the `revertAccordion()` function.
        $accordion.find('div.yyyy-entry.active').each(function(index, element) {
            $heading = $(element).find('div.yyyy-heading');
            $entity = $(element);
            $icon = $heading.find('span > i');
            $panelAffected = $entity.find('div.yyyy-description');
            revertAccordion($heading, $icon, $panelAffected, $entity);
        }); 
    }

    // What to do when a heading of the Accordion is clicked on:
    $accordion.on('click', 'div.yyyy-heading', function (e) {
        wipeAccordion();
        $heading = $(this);  // <div.yyyy-heading>
        $entity = $heading.closest('div.yyyy-entry'); // <div.yyyy-entry>
        $icon = $heading.find('span > i'); // <i>
        $panelAffected = $heading.next();  // <div.yyyy-description>

        headingBackground = e.currentTarget['style'].backgroundColor;
        if (headingBackground === 'rgb(210, 142, 83)') { // Close the accordion.
            revertAccordion($heading, $icon, $panelAffected, $entity);
        }
        else { // Expand the accordion.
            triggerAccordion($heading, $icon, $panelAffected, $entity);
        }
    })

    // Configuration of the DEFAULT tab that should be open once the page is loaded.
    let $defaultEntity = $('div.yyyy-entry').first();
    let $defaultHeading = $defaultEntity.find('div.yyyy-heading');
    let $defaultIcon = $defaultHeading.find('span i');
    let $defaultPanel = $defaultEntity.find('div.yyyy-description');
    triggerAccordion($defaultHeading, $defaultIcon, $defaultPanel, $defaultEntity);
    
    /* VERTICAL DROPDOWN MENU -----------------------------------------------------------------------*/

    $('li.li-level-1.dropdown-1').on('click', function (e) 
    {
        e.stopPropagation();
        console.log($(this));
        let $dMenu1 = $(this).find('ul.d-menu-1');  // <ul> menu.
        let $btn = $(this).find('>a>i.dropdown');  // <i> arrow icon.
        if ($dMenu1.is('.tap')) { // Hide the <ul>.
            $dMenu1.slideUp(500).toggleClass('tap');
            $btn.removeClass('rotate');
            $(this).removeClass('click');
        }
        else { // Show the <ul>
            let $otherDMenus = $('section.skillset>ul').find('li.li-level-1.dropdown-1.click ul.d-menu-1');
            let $otherClicks = $('section.skillset>ul').find('li.li-level-1.dropdown-1.click');
            let $otherBtns = $('section.skillset>ul').find('li.li-level-1.dropdown-1>a>i.rotate');
            $otherDMenus.slideUp(500).toggleClass('tap');
            $otherBtns.removeClass('rotate');
            $otherClicks.removeClass('click');

            $dMenu1.slideDown(500).toggleClass('tap');
            $btn.addClass('rotate');
            $(this).addClass('click');
        }        
    });


    $('li.li-level-2.dropdown-2').on('click', function (e) 
    {
        let $btn = $(this).find('>a>i.dropdown');
        e.stopPropagation();
        let $dMenu2 = $(this).find('ul.d-menu-2');
        if ($dMenu2.is('.tap')) {  // Hide the ul.
            $dMenu2.slideUp(500).toggleClass('tap');
            $btn.removeClass('rotate');
            $(this).removeClass('click');
        }
        else { // Show the dMenu2.
            $dMenu2.slideDown(500).toggleClass('tap');
            $btn.addClass('rotate');
            $(this).addClass('click');
        }        
    });

    // Elements that don't have submenus don't have click functionality.
    $('li.li-level-1:not(.dropdown-1)').off('click');
    $('li.li-level-2:not(.dropdown-2)').off('click');

    /*MERN items --------------------------------------------------------------------------*/
    $mernWrapper = $('div.mern-wrapper');
    
    $items = $('div.mern');

    $items.on('mouseover', '.it', function(e) 
    {
        e.stopPropagation();
        $current = $(this);
        if ($current.is('div.fig')) {
            $img = $current.find('img');
            $img.addClass('active');
        }
        else {
            $current.addClass("active");
        }        
        $current.siblings().css({'filter': 'invert(100%)'});
    })
    $items.on("mouseout", '.it', function(e) 
    {
        e.stopPropagation();
        $current = $(this);
        if ($current.is('div.fig')) {
            $img = $current.find('img');
            $img.removeClass('active');
        }
        else {
            $current.removeClass("active");
        }
        $current.siblings().css({'filter': 'invert(0%)'});
    });

    /*WaniKani Did-You-Know-------------------------------------------------------------------*/
    let $dyk = $('section.dyk');
    let $dykI = $('section.dyk > div.dyk-btn')
    let dykClicks = 0;

    $dykI.on('click', function () 
    {
        if (!(dykClicks%2)) {
            $dyk.css({'margin-right': '-273px'});
        }
        else {
            $dyk.css({'margin-right': '0px'});
        }
        dykClicks++;
    });

    /*Fluent Languages-------------------------------------------------------------------*/
    let $langs = $('section.langs');
    let $langsI = $('section.langs > div.langs-btn');
    let langsClicks = 0;

    $langsI.on('click', function () 
    {
        if(!(langsClicks%2)) {
            $langs.css({'margin-right': '-312px'});
        }
        else {
            $langs.css({'margin-right': '0px'});
        }
        langsClicks++;
    });
});