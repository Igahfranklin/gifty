import React from 'react';
import { useField } from 'formik';

export default function CheckInput ({ children, ...props }) {
    // React treats radios and checkbox inputs differently other input types, select, and textarea.
    // Formik does this too! When you specify `type` to useField(), it will
    // return the correct bag of props for you -- a `checked` prop will be included
    // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
      <div>
        <label className="flex items-center text-fadedGrey text-sm font-light">
          <input type="checkbox" className="accent-primary outline-0 rounded-[8px] border border-[#DDDADB]" {...field} {...props} />
          {children}
        </label>
        {meta.touched && meta.error ? (
          <p className="text-red-500">{meta.error}</p>
        ) : null}
      </div>
    );
};
