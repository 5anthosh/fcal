"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Big = require("decimal.js");
var units_1 = require("./types/units");
function getdefaultTTypes() {
    var ttypes = new units_1.TType.TTypes();
    setDistanceTTypes(ttypes);
    setSpeedTTypes(ttypes);
    setTimeTTypes(ttypes);
    return ttypes;
}
exports.getdefaultTTypes = getdefaultTTypes;
function setDistanceTTypes(ttypes) {
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(1), 'cm', 'cm'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(100), 'm', 'm'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(0.1), 'mm', 'mm'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(100000), 'km', 'km'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(2.54), 'inch', 'inch'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(30.48), 'foot/feet', 'ft'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(91.44), 'yard', 'yd', 'yard'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(160934.4), 'mile', 'mi'));
    ttypes.Add(new units_1.TType('LENGTH', new Big.Decimal(185200), 'nautical mile (nmi)', 'nmi'));
}
function setSpeedTTypes(ttypes) {
    ttypes.Add(new units_1.TType('SPEED', new Big.Decimal(1), 'km/h', 'kmh', 'kmph', 'khm', 'kph'));
    ttypes.Add(new units_1.TType('SPEED', new Big.Decimal(1.609344), 'miles/h', 'mph'));
    ttypes.Add(new units_1.TType('SPEED', new Big.Decimal(3.6), 'm/s', 'mps'));
    ttypes.Add(new units_1.TType('SPEED', new Big.Decimal(1.097), 'ft/s', 'fps'));
    ttypes.Add(new units_1.TType('SPEED', new Big.Decimal(1.852), 'kt', 'kts', 'knots'));
}
function setTimeTTypes(ttypes) {
    ttypes.Add(new units_1.TType('TIME', new Big.Decimal(1), 'second(s)', 'sec', 'second'));
    ttypes.Add(new units_1.TType('TIME', new Big.Decimal(60), 'minute(s)', 'min', 'minute'));
    ttypes.Add(new units_1.TType('TIME', new Big.Decimal(3600), 'hour(s)', 'hr', 'hour'));
    ttypes.Add(new units_1.TType('TIME', new Big.Decimal(86400), 'day(s)', 'day', 'day'));
}
//# sourceMappingURL=defaultUnits.js.map