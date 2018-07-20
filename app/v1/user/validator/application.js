let validator = {};



validator.create =
{
  startDate: {
    presence: true
  },
  endDate : {
    presence: true
  },
  userId : {
    presence: true
  }
}

 validator.getApplication =
{
  id : {
    presence: true
  },
  userId : {
    presence: true
  }
}

validator.update =
{
  id : {
    presence: true 
  },
  startDate : {
    presence: true
  },
  startDate : {
    presence: true
  },
  userId : {
    presence: true
  }

}

validator.cancel =
{
  id : {
    presence: true
  },
  userId : {
    presence: true
  }
}

module.exports = validator;
