import axios from 'axios';

export const getProfessionals = async category => {
  return await axios
    .get(`https://tashteeb.github.io/api/${category}.json`)
    .then(res => {
      console.log(JSON.stringify(res.data, null, 2));
      return res.data;
    })
    .catch(err => {
      console.log(err);
    });
};
