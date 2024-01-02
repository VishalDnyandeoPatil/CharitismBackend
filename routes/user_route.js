const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt= require('bcrypt');

const {users} = require("../model/user_model");
const {auth} = require("../middelware/authentication")