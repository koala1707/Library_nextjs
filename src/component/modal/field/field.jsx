const Field = ({ label, type, value, onChange, checked, ...details }) => {
  return (
    <div className="flex">
      <label>{label}</label>
      {type === 'text'
      ?  <input
      type={type}
      {...details}
      onChange={onChange}
      value={value}
      >
    </input>
    : <input
        type={type}
        {...details}
        onChange={onChange}
        checked={checked}
    ></input>

      }
    </div>
  )
}

export default Field;