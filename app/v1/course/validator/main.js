let validator = {};

validator.getCourse =
{
  id : {
    presence: true
  },
  userId : {
    presence: true
  }
}

validator.create =
{
  title: {
    presence: true
  },
  description : {
    presence: true
  },
  cost : {
    presence: true
  },
  img : {
    presence: true
  },
  mentorId : {
    presence: true
  },
  type : {
    presence: true
  },
  cityId : {
    presence: true
  }
}

validator.update =
{
   id : {
    presence: true
  },
  title: {
    presence: true
  },
  description : {
    presence: true
  },
  cost : {
    presence: true
  },
  img : {
    presence: true
  },
  mentorId : {
    presence: true
  },
  type : {
    presence: true
  },
  cityId : {
    presence: true
  }
}

validator.delete =
{
  id : {
    presence: true 
  }

}


module.exports = validator;
