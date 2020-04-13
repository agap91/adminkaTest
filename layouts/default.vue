<template>
  <div>
    <nuxt />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap&subset=cyrillic");
/* @import '../assets/fontawesome/all.css'; */
*,
*:before,
*:after {
  box-sizing: border-box;
}
a {
  color: #00b9eb;
  text-decoration: noen;
}
* {
  outline: none;
}

body,
html {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  padding: 0;
  margin: 0;
  position: relative;
  font-size: 15px;
  color: #343434;
}
body {
  padding-top: 28px;
  padding-left: 13vw;
  transition: all 0.3s;
  background: #f1f1f1;
}
h1,
h2,
h3 {
  font-weight: 500;
}
.create {
  border: 1px solid #cccccc;
  background: #fff;
  font-size: 15px;
  padding: 2px 15px;
  color: #00b9eb;
  border-radius: 2px;
  transition: all 0.3s;
  cursor: pointer;
}
.create:hover {
  background: #00b9eb;
  color: #fff;
}
#page {
  padding: 0 10px;
}
#filter {
  background: #fff;
  padding: 10px;
  width: 100%;
  margin-bottom: 10px;
  position: sticky;
  top: 28px;
}
input[type="checkbox"],
input[type="radio"] {
  display: none;
}
input[type="checkbox"] + label .check svg,
input[type="radio"] + label .check svg {
  display: none;
}
input[type="checkbox"]:checked + label .check svg,
input[type="radio"]:checked + label .check svg {
  display: block;
  stroke: #282c34;
}
input[type="checkbox"]:checked + label .check,
input[type="radio"]:checked + label .check {
  background: #fff;
  /* border-color: #282c34; */
}
.check {
  border: 1px solid #cfcfcf;
  width: 20px;
  height: 20px;
  border-radius: 2px;
  background: #fff;
  display: flex;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  justify-content: center;
  margin-right: 5px;
}
label {
  display: flex;
  align-items: center;
}
#filter form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.delete {
  background: #ff4940;
  border: 0;
  color: #fff;
  font-size: 15px;
  padding: 8px 15px;
  line-height: 1;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}
.delete:hover {
  opacity: 0.7;
}
select {
  font-size: 15px;
}
.pagination {
  width: 100%;
  border-top: 1px solid #f1f1f1;
  margin-top: 10px;
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.pagination input {
  width: 50px;
}
.tr {
  display: flex;
  justify-content: space-between;
  align-items: left;
  padding: 10px;
}
.table {
  background: #fff;
}
.td {
  flex: 1;
}
.td.checkbox {
  max-width: 40px;
}
.t-head {
  padding: 10px 0;
  border-bottom: 2px solid #e8e8e8;
}
.t-body .tr:nth-child(odd) {
  background: #f9f9f9;
}
.w-100 {
  width: 100%;
}
input, textarea {
  padding: 5px 10px;
  font-size: 15px;
}
.autocomplete-result-list {
  padding: 0;
  list-style: none;
  background: #fff;
}
.autocomplete-result-list li {
  padding: 5px 15px;
  transition: all 0.3s;
  cursor: pointer;
}
.autocomplete-result-list li:hover {
  background: #eee;
}
.tags-list {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  padding: 0;
}
.tags-list li {
  background: #0085ba;
  color: #fff;
  padding: 3px 10px;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  margin-right: 5px;
  margin-bottom: 5px;
}
.tags-list li svg {
  display: none;
  position: absolute;
  fill: #fff;
  stroke: #000;
  top: -7px;
  right: -7px;
}
.tags-list li:hover svg {
  display: block;
}
.blue-btn {
  background: #0085ba;
  border: none;
  color: #fff;
  font-size: 15px;
  padding: 5px 15px;
  cursor: pointer;
  transition: all 0.3s;
}
.blue-btn:hover {
  opacity: 0.7;
}
.text-right {
  justify-content: flex-end;
  display: flex;
}
.wrap {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99999;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.error {
  width: 500px;
  background: #fff;
  padding: 10px;
  box-shadow: 0 0px 9px rgba(0, 0, 0, 0.2);
}
.error h3 {
  margin: 0;
  color: red;
  font-weight: 500;
  font-size: 30px;
}
.error .caption {
  display: flex;
  justify-content: space-between;
}
.error svg {
  cursor: pointer;
}
.custom-icon {
  background-size: 100% 100%;
  display: inline-block;
  /* background-image: url(../assets/images/icons/editor_icons.png); */
  background-size: 500px;
  background-position: 0 0;
}

/* .custom-icon.text {
  
} */

.custom-icon.font {
  background-position: 0 -45px;
}
.custom-icon.fa-paint-brush {
  background-position: 127px -45px;
}
@media (max-width: 576px) {
  body {
    padding-left: 0;
  }
  #filter form {
    display: flex;
    justify-content: unset;
    align-items: unset;
    flex-direction: column;
  }
  #filter form * {
    margin-bottom: 5px;
  }
  .tr .td:not(:first-child):not(:nth-child(2)) {
    display: none;
  }
  #filter {
    position: relative;
    top: 0;
  }
}
</style>

