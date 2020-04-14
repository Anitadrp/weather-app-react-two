import React from 'react';
import ForecastHourly from './ForecastHourly';
import ForecastDaily from './ForecastDaily';

export default function Forecast(props) {
  if (props.isDaily) {
    const dailyItems = props.data.reduce((dayArray, value) => {
      // First day.
      if (dayArray.length === 0) {
        return [{
          date: new Date(value.dt * 1000).toLocaleDateString(),
          maximum: value.main.temp_max,
          minimum: value.main.temp_min,
          icon: `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`,
          description: value.weather[0].description
        }];
      }

      const lastElement = dayArray[dayArray.length - 1];

      const currentDate = new Date(value.dt * 1000).toLocaleDateString();
      const maximum = value.main.temp_max;
      const minimum = value.main.temp_min;

      // Still the same day.
      if (lastElement.date === currentDate) {
        const element = {
          date: currentDate,
          maximum: Math.max(maximum, lastElement.maximum),
          minimum: Math.min(minimum, lastElement.minimum),
          icon: maximum > lastElement.maximum
            ? `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`
            : lastElement.icon,
          description: maximum > lastElement.maximum
            ? value.weather[0].description
            : lastElement.description
        }

        return [...dayArray.slice(0, -1), element];
      }

      // New day.
      return [...dayArray, {
        date: currentDate,
        maximum,
        minimum,
        icon: `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`,
        description: value.weather[0].description
      }];
    }, []);

    return (
      <>
        {
          dailyItems.map(item => (
            <ForecastDaily
              key={item.date}
              isMetric={props.isMetric}
              maximum={item.maximum}
              minimum={item.minimum}
              date={item.date}
              icon={item.icon}
              description={item.description} />
          ))
        }
      </>
    );
  }

  const hourlyItems = props.data.slice(0, 6).map(item => ({
    temperature: item.main.temp,
    time: new Date(item.dt * 1000).toLocaleTimeString(),
    icon: `http://openweathermap.org/img/wn/${
      item.weather[0].icon
      }@2x.png`,
    description: item.weather[0].description
  }));

  return (
    <>
      {
        hourlyItems.map(item => (
          <ForecastHourly
            key={item.time}
            isMetric={props.isMetric}
            temperature={item.temperature}
            time={item.time}
            icon={item.icon}
            description={item.description} />
        ))
      }
    </>
  );
}
