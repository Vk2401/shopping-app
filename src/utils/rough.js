const getAuth = catchAsync(async (req, res) => {
    const env = getCurentEnv(req);
    const data = pick(req.query, ['endUserIp', 'deviceType']);
  
    bankid.getAuthData(env, data.endUserIp, (d) => {
      if (!d) {
        return res.status(httpStatus.NOT_FOUND).send();
      }
      let url;
      if (data.deviceType == "ios") {
        url = "https://app.bankid.com/?autostarttoken=" + d.autoStartToken + "&redirect=null";
      } else {
        url = "bankid:///?autostarttoken=" + d.autoStartToken + "&redirect=null";
      }
      return res.send({ link: url, autoStartToken: d.autoStartToken, orderRef: d.sessionId, sessionId: d.sessionId });
    });
  })
  