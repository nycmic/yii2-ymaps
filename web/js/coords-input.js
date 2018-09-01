(function ($) {

    /**
     * Placemark drag event handler.
     */
    let placemarkMove = function () {
        this.updateInputs(this.placemark.geometry._coordinates);
        console.log(this.placemark);
        this.updatePlace(this.search.getRequestString());
    };

    let searchHappen = function () {
        this.map.geoObjects.remove(this.placemark);
        var result = this.search.getResult(0);
        this.updateInputs(result._value.geometry._coordinates);
        this.updatePlace(this.search.getRequestString());
    };

    /**
     * Main widget object.
     * @param rootEl
     * @constructor
     */
    function Widget(rootEl) {
        this.rootEl = rootEl;
        this.latInput = rootEl.find('.coords-lat');
        this.lngInput = rootEl.find('.coords-lng');
        this.placeInput = rootEl.find('.place');
        this.coords = [this.latInput.val() || 55.76, this.lngInput.val() || 37.64];
        this.placeInput.val() || this.placeInput.val('Moscow');
        this.map = this.createMap();
        this.placemark = this.createPlacemark();
        this.search = this.mySearchControl();
        setTimeout(function(){
            rootEl.trigger('coords-ready', {
                map: this.map,
                placemark: this.placemark
            });
        }, 1);
    }

    /**
     * Creates Yandex map.
     * @returns {ymaps.Map}
     */
    Widget.prototype.createMap = function () {
        let mapElId = this.rootEl.find('.ymaps-map').attr('id');
        let options = this.rootEl.data('map');
        options.center = this.coords;
        options.controls = [];
        return new ymaps.Map(mapElId, options);
    };

    Widget.prototype.mySearchControl = function () {
        let search = new ymaps.control.SearchControl({
            options: {
                float: 'left',
                floatIndex: 100,
            }
        });
        search.events.add('resultshow', searchHappen, this);
        this.map.controls.add(search);
        return search;
    };

    /**
     * Creates and adds a placemark to the map.
     * @returns {ymaps.Placemark}
     */
    Widget.prototype.createPlacemark = function () {
        let placemark = new ymaps.Placemark(
            this.coords,
            draggable = false,
            this.rootEl.data('pm-prop'),
            this.rootEl.data('pm-opt')
        );
        this.updateInputs(this.coords);
        this.map.geoObjects.add(placemark);
        placemark.geometry.events.add('change', placemarkMove, this);
        return placemark;
    };

    /**
     * Updates inputs with new values.
     * @param coords
     */
    Widget.prototype.updateInputs = function (coords) {
        this.latInput.val(coords[0]);
        this.lngInput.val(coords[1]);
    };

    Widget.prototype.updatePlace = function (place) {
        this.placeInput.val(place);
    };

    $.fn.coordsInput = function (cmd, params) {
        let widget = $(this).data('coords-input');
        if (cmd === 'search') {
            let geocoder = ymaps.geocode(params, {
                results: 1
            });
            geocoder.then(
                function (res) {
                    let coords = res.geoObjects.get(0).geometry.getCoordinates();
                    widget.placemark.geometry.setCoordinates(coords);
                    widget.map.panTo(coords);
                }
            );
        }
    };

    /**
     * Yandex maps initialized.
     */
    $(function () {
        ymaps.ready(function () {
            $('.coords-input').each(function () {
                $(this).data('coords-input', new Widget($(this)));
            });
        });
    });

})(jQuery);

