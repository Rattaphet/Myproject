const BASE_URL = 'http://localhost:8000';

let mode = 'CREATE';
let selectedId = ''; //ตัวแปรแบบ Global ใช้ได้ทุกที่

window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let id = urlParams.get('id');
  console.log('id', id);
  if (id) {
    mode = 'EDIT';
    selectedId = id;

    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      const user = response.data;

      let firstNameDOM = document.querySelector('input[name=firstname]');
      let lastNameDOM = document.querySelector('input[name=lastname]');
      let ageDOM = document.querySelector('input[name=age]');
      let addressDOM = document.querySelector('input[name=address]');

      let subjectDOM = document.querySelector('input[name=subject]');
      let gradeDOM = document.querySelector('input[name=grade]');
      let activitiesDOM = document.querySelector('input[name=activities]');
      let firstnametDOM = document.querySelector('input[name=firstnamet]');
      let lastnametDOM = document.querySelector('input[name=lastnamet]');
      let taughtDOM = document.querySelector('input[name=taught]');
      let timeDOM = document.querySelector('input[name=time]');

      firstNameDOM.value = user.firstname;
      lastNameDOM.value = user.lastname;
      ageDOM.value = user.age;
      addressDOM.value = user.address;

      subjectDOM.value = user.subject;
      gradeDOM.value = user.grade;
      activitiesDOM.value = user.activities;
      firstnametDOM.value = user.firstnamet;
      lastnametDOM.value = user.lastnamet;
      taughtDOM.value = user.taught;
      timeDOM.value = user.time;

      const education_levelDOMs = document.querySelector('input[name=education_level]');
      for (let i = 0; i < education_levelDOMs.length; i++) {
          if (education_levelDOMs[i].checked) {
              userData.education_level = education_levelDOMs[i].value;
              break; // เมื่อพบค่า ให้หยุดลูป
          }
      }
      
      // ตรวจสอบว่ามีการเลือก education level หรือไม่และกำหนดค่าให้ education_levelDOMs.value
      if (user.education_level) {
          education_levelDOMs.value = user.education_level;
      }

    } catch (error) {
      console.log('error', error);
    }
  }
};

const validateData = (userData) => {
  let errors = [];
  if (!userData.firstname) {
    errors.push('กรุณากรอกชื่อ');
  }
  if (!userData.lastname) {
    errors.push('กรุณากรอกนามสกุล');
  }
  if (!userData.age) {
    errors.push('กรุณากรอกอายุ');
  }
  if (!userData.address) {
    errors.push('กรุณากรอกที่อยู่');
  }
  if (!userData.education_level) {
    errors.push('กรุณากรอกระดับการศึกษา');
  }
  if (!userData.subject) {
    errors.push('กรุณากรอกวิชาที่เรียน');
  }
  if (!userData.grade) {
    errors.push('กรุณากรอกผลการเรียน');
  }
  if (!userData.activities) {
    errors.push('กรุณากรอกกิจกรรมเสริมการเรียน');
  }
  if (!userData.firstnamet) {
    errors.push('กรุณากรอกชื่อจริง(ครู/อาจารย์)');
  }
  if (!userData.lastnamet) {
    errors.push('กรุณากรอกนามสกุล(ครู/อาจารย์)');
  }
  if (!userData.taught) {
    errors.push('กรุณากรอกวิชาที่สอน');
  }
  if (!userData.time) {
    errors.push('กรุณากรอกเวลาเรียน');
  }
  return errors;
};

const submitData = async () => {
  let firstNameDOM = document.querySelector('input[name=firstname]');
  let lastNameDOM = document.querySelector('input[name=lastname]');
  let ageDOM = document.querySelector('input[name=age]');
  let addressDOM = document.querySelector('input[name=address]');
  let education_levelDOM = document.querySelector('input[name=education_level]:checked');
  let education_level = education_levelDOM ? education_levelDOM.value : '';

  let subjectDOM = document.querySelector('input[name=subject]');
  let gradeDOM = document.querySelector('input[name=grade]');
  let activitiesDOM = document.querySelector('input[name=activities]');
  let firstnametDOM = document.querySelector('input[name=firstnamet]');
  let lastnametDOM = document.querySelector('input[name=lastnamet]');
  let taughtDOM = document.querySelector('input[name=taught]');
  let timeDOM = document.querySelector('input[name=time]');

  let messageDOM = document.getElementById('message');

  try {
    let userData = {
      firstname: firstNameDOM.value,
      lastname: lastNameDOM.value,
      age: ageDOM.value,
      address: addressDOM.value,
      education_level: education_level,
      subject: subjectDOM.value,
      grade: gradeDOM.value,
      activities: activitiesDOM.value,
      firstnamet: firstnametDOM.value,
      lastnamet: lastnametDOM.value,
      taught: taughtDOM.value,
      time: timeDOM.value
    };
    console.log('submit data', userData);

    const errors = validateData(userData);

    if (errors.length > 0) {
      throw {
        message: 'กรอกข้อมูลไม่ครบ!',
        errors: errors
      };
    }

    let message = 'บันทึกข้อมูลสำเร็จ!';

    if (mode == 'CREATE') {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      console.log('response', response.data);
    } else {
      const response = await axios.put(`${BASE_URL}/users/${selectedId}`, userData);
      message = 'แก้ไขข้อมูลสำเร็จ!';
      console.log('response', response.data);
    }
    messageDOM.innerText = message;
    messageDOM.className = 'message success';

  } catch (error) {
    console.log('error message', error.message);
    console.log('error', error.errors);
    if (error.response) {
      console.log(error.response);
      error.message = error.response.data.message;
      error.errors = error.response.data.errors;
    }
    let htmlData = '<div>';
    htmlData += `<div>${error.message}</div>`;
    htmlData += '<ul>';
    for (let i = 0; i < error.errors.length; i++) {
      htmlData += `<li>${error.errors[i]}</li>`;
    }
    htmlData += '</ul>';
    htmlData += '<div>';

    messageDOM.innerHTML = htmlData;
    messageDOM.className = 'message danger';
  }
};
