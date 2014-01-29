var chai = require("chai");
var assert = chai.assert;
var streams = require("../index");

describe("MockReadableStream", function () {
    it("should implement setEncoding as noop", function () {
        var mock = new streams.MockReadableStream();
        assert.doesNotThrow(function () {
            mock.setEncoding("utf8");
        });
    });
    it("should implement pause as noop", function () {
        var mock = new streams.MockReadableStream();
        assert.doesNotThrow(function () {
            mock.pause();
        });
    });
    it("should implement resume as noop", function () {
        var mock = new streams.MockReadableStream();
        assert.doesNotThrow(function () {
            mock.resume();
        });
    });
    it("should implement destroy as noop", function () {
        var mock = new streams.MockReadableStream();
        assert.doesNotThrow(function () {
            mock.destroy();
        });
    });
    it("should not be a TTY", function () {
        var mock = new streams.MockReadableStream();
        assert.isFalse(mock.isTTY);
    });
    it("should emit data on write", function (done) {
        var fixture = "dogcow";
        var mock = new streams.MockReadableStream();
        mock.once("data", function (data) {
            assert.isString(data);
            assert.strictEqual(data, fixture);
            done();
        });
        mock.write(fixture);
    });
    it("should emit string data on Buffer write", function (done) {
        var fixture = "dogcow";
        var mock = new streams.MockReadableStream();
        mock.once("data", function (data) {
            assert.isString(data);
            assert.strictEqual(data, fixture);
            done();
        });
        mock.write(new Buffer(fixture, "utf8"));
    });
});
describe("MockWritableStream", function () {
    it("should emit data on write", function (done) {
        var fixture = "dogcow";
        var mock = new streams.MockWritableStream();
        mock.once("data", function (data) {
            assert.isString(data);
            assert.strictEqual(data, fixture);
            done();
        });
        mock.write(fixture);
    });
    it("should emit string data on Buffer write", function (done) {
        var fixture = "dogcow";
        var mock = new streams.MockWritableStream();
        mock.once("data", function (data) {
            assert.isString(data);
            assert.strictEqual(data, fixture);
            done();
        });
        mock.write(new Buffer(fixture, "utf8"));
    });
    it("expect should trigger for expectedString", function (done) {
        var expectedString = "dogcow";
        var mock = new streams.MockWritableStream();
        mock.expect(expectedString, function (err, data) {
            assert.isNull(err); 
            assert.isString(data);
            assert.strictEqual(data, "foobar" + expectedString, "Intermediate data not given to expect callback");
            done();
        });
        mock.write("foo");
        mock.write("bar" + expectedString);
    });
    it("captureData should capture all data after its called", function () {
        var expectedString = "dogcow";
        var mock = new streams.MockWritableStream();
        mock.write("foo");
        mock.captureData();
        mock.write("bar" + expectedString);
        mock.write("baz");
        assert.strictEqual(mock.capturedData, "bar" + expectedString + "baz");
    });
});
