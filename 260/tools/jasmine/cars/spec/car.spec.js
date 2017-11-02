describe('somethung', function() {
  beforeEach(function() {
    this.vehicle = new Car({make: 'ford', model: 'falcon'});
  });

  it("sets properties when an object is passed in", function () {
    expect(this.vehicle.make).toBe('ford');
    expect(this.vehicle.model).toBe('falcon');
  })

  it( "returns a concatenated string with make and model", function () {
    expect(this.vehicle.toString()).toBe('ford falcon');
  })

  it("returns a message when the horn is honked", function() {
    expect(this.vehicle.honkHorn()).toBe('beep');
  })
})


describe('honda tests', function() {

  beforeEach(function() {
    this.vehicle = new Honda('Accord');
  });

  it('inherits the Vehicle prototype', function() {
    expect(this.vehicle.toString()).toBe('honda Accord')
  })

  it('throws an error if an invalid model is passed in', function() {
    function makebadHopnda() {
      return new Honda('falcon');
    }

    expect(makebadHopnda).toThrow(new Error('Model falcon does not exist.'))
  })

  it("returns a list of valid models", function() {
    expect(this.vehicle.getModels().length).toBeDefined()
    expect(this.vehicle.getModels()).toContain("CR-Z")
  })

  it('calls getPrice when a new car is created', function() {
    spyOn(Honda, 'getPrice');
    var newVehicle = new Honda('Accord');
    expect(Honda.getPrice).toHaveBeenCalled();
  })

  it('eturns a price for the passed in model', function() {
    expect(this.vehicle.price).toBeGreaterThan(0)
  })

  it('gets prices right', function() {
    var newVehicle = new Honda('Civic')
    expect(newVehicle.price).toBeLessThan(15000)
  })
})
