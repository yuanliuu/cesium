/*global defineSuite*/
defineSuite([
         'Core/CircleGeometry',
         'Core/Cartesian3',
         'Core/Cartographic',
         'Core/Ellipsoid',
         'Core/VertexFormat'
     ], function(
         CircleGeometry,
         Cartesian3,
         Cartographic,
         Ellipsoid,
         VertexFormat) {
    "use strict";
    /*global jasmine,describe,xdescribe,it,xit,expect,beforeEach,afterEach,beforeAll,afterAll,spyOn,runs,waits,waitsFor*/

    it('throws without a center', function() {
        expect(function() {
            return new CircleGeometry({});
        }).toThrow();
    });

    it('throws with a negative radius', function() {
        expect(function() {
            return new CircleGeometry({
                center : Cartesian3.UNIT_X,
                radius : -1.0
            });
        }).toThrow();
    });

    it('throws with a negative granularity', function() {
        expect(function() {
            return new CircleGeometry({
                center : Cartesian3.UNIT_X,
                granularity : -1.0
            });
        }).toThrow();
    });

    it('computes positions', function() {
        var ellipsoid = Ellipsoid.WGS84;
        var m = new CircleGeometry({
            vertexFormat : VertexFormat.POSITION_ONLY,
            ellipsoid : ellipsoid,
            center : ellipsoid.cartographicToCartesian(new Cartographic()),
            granularity : 0.75,
            radius : 1.0
        });

        expect(m.attributes.position.values.length).toEqual(3 * 32);
        expect(m.indexLists[0].values.length).toEqual(3 * 48);
        expect(m.boundingSphere.radius).toEqual(1);
    });

    it('compute all vertex attributes', function() {
        var ellipsoid = Ellipsoid.WGS84;
        var m = new CircleGeometry({
            vertexFormat : VertexFormat.ALL,
            ellipsoid : ellipsoid,
            center : ellipsoid.cartographicToCartesian(new Cartographic()),
            granularity : 0.75,
            radius : 1.0
        });

        expect(m.attributes.position.values.length).toEqual(3 * 32);
        expect(m.attributes.st.values.length).toEqual(2 * 32);
        expect(m.attributes.normal.values.length).toEqual(3 * 32);
        expect(m.attributes.tangent.values.length).toEqual(3 * 32);
        expect(m.attributes.binormal.values.length).toEqual(3 * 32);
        expect(m.indexLists[0].values.length).toEqual(3 * 48);
    });
});
