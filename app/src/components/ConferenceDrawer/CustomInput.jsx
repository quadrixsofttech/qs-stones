import { AiTwotoneCalendar } from 'react-icons/ai';

export default function CustomMultipleInput({ props, ref }) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        onFocus={props.onFocus}
        value={props.value}
        onChange={props.onChange}
        readOnly
      />
      <AiTwotoneCalendar
        style={{
          position: 'relative',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
    </div>
  );
}
