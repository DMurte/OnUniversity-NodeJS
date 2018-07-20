let validator = {};

validator.getTopic =
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
  }
}

validator.delete =
{
  id : {
    presence: true 
  }

}


module.exports = validator;
