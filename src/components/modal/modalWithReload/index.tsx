import React from "react";
export function ModalWithReload(props: { message: string }) {
  const onclick = () => window.location.replace(window.location.pathname);
  return (
    <>
      <h5>{props.message}</h5>
      <button className="button" onClick={onclick}>
        Reload
      </button>
    </>
  );
}
