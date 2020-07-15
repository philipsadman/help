import React, { useState } from 'react';
import PropTypes from 'prop-types';

const useNavigation = (length) => {
  const [shift, setShift] = useState(0);
  const STEP = 4;

  const backward = () => shift > 0 && setShift(shift - 1);
  const forward = () => shift < length - 4 && setShift(shift + 1);

  const cut = (array) => {
    return [...array].splice(shift, STEP);
  };

  return { forward, backward, cut };
};

const Journal = ({ students }) => {
  const dates = students.reduce((acc, { dates }) => {
    dates.forEach(date => {
      if (acc.indexOf(date.date) === -1) acc.push(date.date);
    });

    return acc;
  }, []);

  const navigation = useNavigation(dates.length);

  const rowStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const firstRowStyles = {
    justifyContent: 'left',
    paddingLeft: 30
  };

  return (
    <div className="journal">
      <div
        className="dates-columns"
        style={{
          display: 'flex'
        }}
      >
        <div
          style={{
            width: 300,
            ...rowStyles,
            ...firstRowStyles
          }}
        >
          <span>#</span>
          <span style={{ marginLeft: 20 }}>Students</span>
        </div>

        <div
          style={{ height: 50, width: 20, ...rowStyles }}
          onClick={navigation.backward}
        >
          {`<`}
        </div>

        {navigation.cut(dates).map(
          (date, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 50
              }}
            >
              <div style={{ flex: 1, ...rowStyles }}>{date}</div>
              <div key={i} style={{ flex: 1, ...rowStyles }}>
                <div style={{ flex: 1, ...rowStyles }}>Урок</div>
                <div style={{ flex: 1, ...rowStyles }}>Тест</div>
                <div style={{ flex: 1, ...rowStyles }}>Д/З</div>
              </div>
            </div>
          )
        )}

        <div
          style={{ height: 50, width: 20, ...rowStyles }}
          onClick={navigation.forward}
        >
          {`>`}
        </div>
      </div>

      <div className="students">
        {students.map(
          (student, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                height: 50
              }}
            >
              <div
                style={{ width: 300, ...rowStyles, ...firstRowStyles }}
              >
                <span>{i + 1}</span>
                <span style={{ marginLeft: 20 }}>{student.name}</span>
              </div>

              <div style={{ height: 50, width: 20 }}></div>

              {navigation.cut(dates).map(
                (date, i) => (
                  <div style={{ flex: 1, ...rowStyles }} key={i}>
                    {student.dates.find(d => d.date === date)?.scores.map(score => (
                      <div style={{ flex: 1, ...rowStyles }}>{score}</div>
                    ))}
                  </div>
                )
              )}

              <div style={{ height: 50, width: 20 }}></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const date = PropTypes.shape({
  date: PropTypes.string,
  scores: PropTypes.arrayOf(PropTypes.oneOfType(PropTypes.number, null))
});

const student = PropTypes.shape({
  name: PropTypes.string,
  dates: PropTypes.arrayOf(date)
});

Journal.propTypes = {
  students: PropTypes.arrayOf(student).isRequired
};

export default Journal;
