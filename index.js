// Copyright 2022 Rene Pohland.
// SPDX-License-Identifier: Apache-2.0
const path = require('path');
const day = process.argv[2];

if (!parseInt(day)) throw new Error(`${day} is not valid for a day!`);

const dayPath = path.resolve(__dirname, day);
const code = require(dayPath);

code.run();