const User = require("../schema/User");

const createUser = async (user) => {
  console.log("createUser");
  console.log(user);

  try {
    const newUser = new User(user);
    await newUser.save();
    return true;
  } catch (error) {
    console.log("Error create new User, Error: ", error);
    return false;
  }
};

const isUserExists = async ({ phone, id, expoToken }) => {
  try {
    const user = await User.find({ phone: phone, id: id });
    if (user.length === 0) {
      return false;
    }
    console.log("isUserExists - user: ", user);
    await User.findByIdAndUpdate(user[0]._id, {
      $set: { isLogin: true, expoToken: expoToken },
    });
    return user;
  } catch (error) {
    console.log("Error isUserExists, Error: ", error);
  }
};

const updateLoginProcess = async ({ phone, id }) => {
  try {
    console.log("updateLoginProcess");
    console.log(id);
    console.log(typeof id);

    const user = await User.find({ id: id });
    console.log(`find user, user: ${user}`);
    if (user == null) {
      return false;
    }
    console.log(user);
    await User.updateOne(
      { _id: user[0]._id },
      {
        $set: {
          isCompleteLoginProcess: true,
        },
      }
    );
    return true;
  } catch (error) {
    console.log("Error update Login Process, Error: ", error);
  }
};

const setUserInfo = async (userInfo) => {
  try {
    console.log("setUserInfo -> : userInfo", userInfo);
    let user = JSON.parse(userInfo);
    const { phone, id } = user;
    console.log(phone, id);
    const findUser = await User.find({ id: id });

    console.log(`find user, user: ${findUser}`);

    console.log("this is user:", user);

    if (findUser == null) {
      return false;
    }

    await User.updateOne(
      { _id: findUser[0]._id },
      {
        $set: {
          firstName: user.firstName,
          lastName: user.lastName,
          birthday: user.birthday,
          gender: user.gender,
          covidResult: user.covidResult,
          privateHouse: user.privateHouse,
          liveAlone: user.liveAlone,
          location: user.location,
          isCompleteLoginProcess: true,
        },
      }
    );

    return true;
  } catch (error) {
    console.log("Error update Login Process, Error: ", error);
  }
};

const getUserById = async (id) => {
  try {
    console.log("getUserById");
    const user = await User.find({ id: id });
    console.log("ger user by id -> user: ", user);
    return user;
  } catch (error) {
    console.log("Error get User By Id", error);
  }
};

const updateUserCollaborator = async(user, newValue) => {
  try {
    console.log("updateUserCollaborator");
    console.log("ger user by id -> user: ", user);
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          collaborator: newValue,
        },
      }
    );
  } catch (error) {
    console.log("Error get User By Id", error);
  }
};


const updateUserCovidResult = async(user, newValue) => {
  try {
    console.log("updateUserCovidResult");
    console.log("ger user by id -> user: ", user);
    await User.updateOne(
      { _id: user._id },
      {
        $set: {
          covidResult:newValue
        },
      }
    );
  } catch (error) {
    console.log("Error get User By Id", error);
  }
};










module.exports = {
  createUser,
  isUserExists,
  updateLoginProcess,
  setUserInfo,
  getUserById,
  updateUserCollaborator,
  updateUserCovidResult
};
