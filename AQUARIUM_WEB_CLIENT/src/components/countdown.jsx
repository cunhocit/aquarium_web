import Countdown from 'react-countdown';

export default function ClockCountdown() {

    // định dạng YYYY-MM-DDTHH:MM:SS
    const flashSaleEndDate = new Date('2024-12-20T00:00:00');
    const formatTime = (time) => String(time).padStart(2, '0');

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
          return <span style={{ color: '#ff0000', fontSize: '1.5em' }}>Flash Sale Đã Kết Thúc!</span>;
        } else {
          return (
            <div className='count-down-style'>
                {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}
            </div>
          );
        }
      };

    return (
        <div>
            <Countdown date={flashSaleEndDate} renderer={renderer}/>
        </div>
    );
}