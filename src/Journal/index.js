import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const useNavigation = (length, step) => {
  const [shift, setShift] = useState(0);

  const backward = () => shift > 0 && setShift(shift - 1);
  const forward = () => shift < length - step && setShift(shift + 1);

  const cut = array => {
    return [...array].splice(shift, step);
  };

  return { forward, backward, cut, shift };
};

const Journal = ({ students, events, step }) => {
  const navigation = useNavigation(events.length, step);

  return (
    <div style={{ fontSize: 14 }}>
      <div
        style={{
          display: 'flex',
          padding: '10px 0',
          borderTop: '2px solid #eee',
          boxShadow: '0px 4px 5px -2px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div
          style={{
            width: 300,
            ...styles.firstRowStyles
          }}
        >
          <span>#</span>
          <span style={{ marginLeft: 20 }}>Students</span>
        </div>

        <div
          style={{ ...styles.arrow }}
          onClick={navigation.backward}
        >
          {`<`}
        </div>

        {navigation.cut(events).map(
          event => (
            <div
              key={event.educationPlanEventId}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                height: 50
              }}
            >
              <div style={{ ...styles.rowStyles, color: '#777' }}>{event.bookedStartDate}</div>
              <div style={{ ...styles.rowStyles }}>
                <div style={{ ...styles.rowStyles, fontWeight: 600 }}>Урок</div>
                <div style={{ ...styles.rowStyles, fontWeight: 600 }}>Тест</div>
                {event.homeworkAttached && <div style={{ ...styles.rowStyles, fontWeight: 600 }}>Д/З</div>}
              </div>
            </div>
          )
        )}

        <div
          style={{ ...styles.arrow }}
          onClick={navigation.forward}
        >
          {`>`}
        </div>
      </div>

      <div className="students">
        {students.map(
          (student, index) => (
            <div
              key={student.id}
              style={{
                display: 'flex',
                height: 50
              }}
            >
              <div
                style={{ width: 300, ...styles.firstRowStyles }}
              >
                <span>{index + 1}</span>
            <span style={{ marginLeft: 20 }}>{student.firstName} {student.lastName}</span>
              </div>

              <div style={{ height: 50, width: 20 }}></div>

              {navigation.cut(events).map(
                event => {
                  const studentEvent = student.events.find(
                    e => e.educationPlanEventId === event.educationPlanEventId
                  );

                  return (
                    <div style={{ ...styles.rowStyles }} key={event.educationPlanEventId}>
                      <div style={{ ...styles.rowStyles, ...styles.bodyRow }}>{studentEvent?.lessonScore}</div>
                      <div style={{ ...styles.rowStyles, ...styles.bodyRow }}>{studentEvent?.testScore}</div>
                      {
                        event.homeworkAttached && (
                          <div style={{ ...styles.rowStyles, ...styles.bodyRow }}>{studentEvent?.homeworkScore}</div>
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
