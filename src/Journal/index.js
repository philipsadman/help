import React, { useState } from 'react';
import PropTypes from 'prop-types';

const useNavigation = (length, step) => {
  const [shift, setShift] = useState(0);

  const backward = () => shift > 0 && setShift(shift - 1);
  const forward = () => shift < length - step && setShift(shift + 1);

  const cut = array => {
    return [...array].splice(shift, step);
  };

  return { forward, backward, cut };
};

const Journal = ({ students, events, step }) => {
  const navigation = useNavigation(events.length, step);

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

        {navigation.cut(events).map(
          (event, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 50
              }}
            >
              <div style={{ flex: 1, ...rowStyles }}>{event.bookedStartDate}</div>
              <div key={i} style={{ flex: 1, ...rowStyles }}>
                <div style={{ flex: 1, ...rowStyles }}>Урок</div>
                <div style={{ flex: 1, ...rowStyles }}>Тест</div>
                {event.homeworkAttached && <div style={{ flex: 1, ...rowStyles }}>Д/З</div>}
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
            <span style={{ marginLeft: 20 }}>{student.firstName} {student.lastName}</span>
              </div>

              <div style={{ height: 50, width: 20 }}></div>

              {navigation.cut(events).map(
                (event, i) => {
                  const studentEvent = student.events.find(
                    e => e.educationPlanEventId === event.educationPlanEventId
                  );

                  return (
                    <div style={{ flex: 1, ...rowStyles }} key={i}>
                      <div style={{ flex: 1, ...rowStyles }}>{studentEvent?.lessonScore}</div>
                      <div style={{ flex: 1, ...rowStyles }}>{studentEvent?.testScore}</div>
                      {
                        event.homeworkAttached && (
                          <div style={{ flex: 1, ...rowStyles }}>{studentEvent?.homeworkScore}</div>
                        )
                      }
                    </div>
                  )
                }
              )}

              <div style={{ height: 50, width: 20 }}></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const event = PropTypes.shape({
  educationPlanEventId: PropTypes.string,
  bookedStartDate: PropTypes.string,
  isCompleted: PropTypes.bool,
  educationPlanId: PropTypes.string,
  name: PropTypes.string,
  lessonId: PropTypes.string,
  testAttached: PropTypes.bool,
  homeworkAttached: PropTypes.bool
});

const scores = PropTypes.shape({
  lessonScore: PropTypes.number,
  isVisited: PropTypes.bool,
  educationPlanEventId: PropTypes.string,
  testScore: PropTypes.number,
  isTestCompleted: PropTypes.bool,
  homeworkScore: PropTypes.number
});

const student = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  events: PropTypes.arrayOf(scores)
});

Journal.propTypes = {
  students: PropTypes.arrayOf(student).isRequired,
  events: PropTypes.arrayOf(event).isRequired,
  step: PropTypes.number
};

export default Journal;
