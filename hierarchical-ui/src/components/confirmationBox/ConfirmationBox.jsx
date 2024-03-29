import React from 'react';
import Swal from 'sweetalert2';


const ConfirmationBox = (
  executeOnConfirm = () => { },
  executeOnDecline = () => { },
  testBeforeConfirm = "You won't be able to revert this!",
  titleOnSuccess = "Deleted!",
  textOnSuccess = "Your file has been deleted.",
  titleOnDecline = "Cancelled!",
  textOnDecline = "Your file is safe :)",
  confirmButtonText = 'Yes, delete it!',
  cancelButtonText = 'No, cancel!',
  setRefetch = () => {}
) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


  const openDeleteBox = () => {
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: testBeforeConfirm,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
      customClass: {
        confirmButton: `yesBtn`,
        cancelButton: `cancelBtn`,
        okButton: `okBtn`
      }
    }).then((result) => {
      if (result.isConfirmed) {
        executeOnConfirm();
        setRefetch(state => !state);
        swalWithBootstrapButtons.fire({
          title: titleOnSuccess,
          text: textOnSuccess,
          icon: 'success',
          customClass: {
            confirmButton: `yesBtn`,
            cancelButton: `cancelBtn`,
            okButton: `okBtn`
          }
        })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        executeOnDecline();
        swalWithBootstrapButtons.fire({
          title: titleOnDecline,
          text: textOnDecline,
          icon: 'error',
          customClass: {
            confirmButton: `yesBtn`,
            cancelButton: `cancelBtn`,
            okButton: `okBtn`
          }
        }
        )
      }
    })
  }

  openDeleteBox();
};

export default ConfirmationBox;