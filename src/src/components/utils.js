export const formatRealm = (data, role = "", stCode = "", dtCode = "", ac = "") => {
  if (!role && !stCode && !dtCode && !ac) {
    let roles = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      temp[e[3][0]] = e[3][1];
    }
    Object.keys(temp).map((val) => {
      roles.push({
        roleCode: val,
        roleName: temp[val]
      })
    })
    return roles;
  } else if (role && !stCode && !dtCode && !ac) {
    let states = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      if (e[3][0] === role) {
        temp[e[0][0]] = e[0][1];
      }
    }
    Object.keys(temp).map((val) => {
      states.push({
        stCode: val,
        stName: temp[val]
      })
    })
    return states;
  } else if (role && stCode && !dtCode && !ac) {
    let districts = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      if (e[3][0] === role && e[0][0] === stCode) {
        temp[e[1][0]] = e[1][1];
      }
    }
    Object.keys(temp).map((val) => {
      districts.push({
        dtCode: val,
        dtName: temp[val]
      })
    })
    return districts;
  } else if (role && stCode && dtCode && !ac) {
    let acs = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      if (e[3][0] === role && e[0][0] === stCode && e[1][0] === dtCode) {
        temp[e[2][0]] = e[2][1];
      }
    }
    Object.keys(temp).map((val) => {
      acs.push({
        acCode: val,
        acName: temp[val]
      })
    })
    return acs;
  }
  return [];
}

export const formatRealm2 = (data, stCode = "", dtCode = "", ac = "", role = "") => {
  if (!stCode && !dtCode && !ac && !role) {
    let states = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      temp[e[0][0]] = e[0][1];
    }
    Object.keys(temp).map((val) => {
      states.push({
        stCode: val,
        stName: temp[val]
      })
    })
    return states;
  } else if (stCode && !dtCode && !ac & !role) {
    let districts = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      if (e[0][0] === stCode) {
        temp[e[1][0]] = e[1][1];
      }
    }
    Object.keys(temp).map((val) => {
      districts.push({
        dtCode: val,
        dtName: temp[val]
      })
    })
    return districts;
  } else if (stCode && dtCode && !ac && !role) {
    let acs = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      if (e[0][0] === stCode && e[1][0] === dtCode) {
        temp[e[2][0]] = e[2][1];
      }
    }
    Object.keys(temp).map((val) => {
      acs.push({
        acCode: val,
        acName: temp[val]
      })
    })
    return acs;
  } else if (stCode && dtCode && ac && !role) {
    let roles = [];
    let temp = {}
    for (let i = 0; i < data.length; i++) {
      const e = data[i];
      if (e[0][0] === stCode && e[1][0] === dtCode && e[2][0] === ac) {
        temp[e[3][0]] = e[3][1];
      }
    }
    Object.keys(temp).map((val) => {
      roles.push({
        roleCode: val,
        roleName: temp[val]
      })
    })
    return roles;
  }
  return [];
}

export const getRealm = async (module_name, operation) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_SERVER}/user/getRealm`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          "module_name": module_name,
          "operation": operation
        })

      }
    );
    const data2 = await response.json();
    if (data2.data) {
      return data2.data;
    } else {
      return []
    }
  } catch (err) {
    console.log(err);
  }
  return [];
}