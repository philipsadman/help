const rowBasicsStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
};

export default {
  arrow: {
    ...rowBasicsStyles,
    height: 50,
    width: 20
  },

  bodyRow: {
    borderRight: '1px solid #eee'
  },

  rowStyles: {
    ...rowBasicsStyles,
    flex: 1
  },

  firstRowStyles: {
    paddingLeft: 30,
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    color: '#555'
  }
};
