let validator = {};

validator.getPost =
{
  id : {
    presence: true
  }
}

validator.create =
{
  userId: {
    presence: true
  },
  text : {
    presence: true
  },
  postOrigin : {
    presence: true
  },
  lessonId : {
    presence: true
  }
}

validator.update =
{
  id : {
    presence: true 
  },
  text : {
    presence: true
  }
}

validator.delete =
{
  id : {
    presence: true 
  },
  userId : {
    presence: true
  }

}

validator.vote =
{
  id : {
    presence: true 
  },
  userId : {
    presence: true
  }
}

validator.deleteVote =
{
  id : {
    presence: true 
  },
  userId : {
    presence: true
  }
}












module.exports = validator;
