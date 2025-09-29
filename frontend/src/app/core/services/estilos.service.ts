import {
  Injectable
} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstilosService {
  styleDivMainModal = 'mx-auto bg-white relative rounded-md shadow-md transition-[margin-top,transform] duration-[0.4s,0.3s] group-[.show]:mt-16 group-[.modal-static]:scale-[1.05] dark:bg-darkmode-600 w-full';
  styleDivHeaderModal = 'flex items-center px-5 py-3 border-b border-slate-200/60 dark:border-darkmode-400';
  styleAX = 'absolute right-0 top-0 mr-3 mt-3';
  styleIconX = 'stroke-1.5 w-5 h-5 h-8 w-8 text-slate-400 h-8 w-8 text-slate-400';

  styleDataTable = 'w-full text-left -mt-2 border-separate border-spacing-y-[10px]';
  styleThDataTable = 'font-medium px-5 py-3 dark:border-darkmode-300 whitespace-nowrap border-b-0';
  styleTdDataTable = 'px-5 py-3 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600';
  styleTdDataTableSmall = 'px-5 py-1 border-b dark:border-darkmode-300 box rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600';
  styleTdButtonsDataTable = 'px-5 py-3 border-b dark:border-darkmode-300 box w-56 rounded-l-none rounded-r-none border-x-0 shadow-[5px_3px_5px_#00000005] first:rounded-l-[0.6rem] first:border-l last:rounded-r-[0.6rem] last:border-r dark:bg-darkmode-600 before:absolute before:inset-y-0 before:left-0 before:my-auto before:block before:h-8 before:w-px before:bg-slate-200 before:dark:bg-darkmode-400';
  styleListSmallButtonPrimary = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-primary border-primary text-white dark:border-primary mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonPending = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-pending border-pending text-white dark:border-pending mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonDark = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-dark border-dark text-white dark:border-dark mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonWarning = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-warning border-warning  dark:border-warning mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonSuccess = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-success border-success  dark:border-success mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonSecondary = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-secondary/70 border-secondary/70  dark:border-secondary/70 mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonDanger = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-danger border-danger text-white dark:border-danger mb-2 mr-1 tooltip cursor-pointer';
  styleButtonSearch = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary mb-2 mr-2 w-32';
  styleButtonPrimary = 'transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary shadow-md mb-2 mr-2 w-32';
  styleButtonPrimaryLarge = 'transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary shadow-md mb-2 mr-2 w-56';
  styleButtonPrimaryXLarge = 'transition duration-200 border inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-primary border-primary text-white dark:border-primary shadow-md mb-2 mr-2 w-60';
  styleButtonPending = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-pending border-pending text-white dark:border-pending mb-2 mr-2 w-32';
  styleButtonPendingLarge = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-pending border-pending text-white dark:border-pending mb-2 mr-2 w-56';
  styleButtonSuccess = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-success border-success text-slate-900 dark:border-success mb-2 mr-2 w-32 mb-2 mr-2 w-32';
  styleButtonWarning = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-warning border-warning text-slate-900 dark:border-warning mb-2 mr-2 w-32 mb-2 mr-2 w-32';
  styleButtonDanger = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed bg-danger border-danger text-white dark:border-danger mb-2 mr-2 w-32';
  styleInputText = 'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10';
  styleInputTextBorderRed = 'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 border-color-red';
  styleSelect = 'disabled:bg-slate-100 disabled:cursor-not-allowed disabled:dark:bg-darkmode-800/50 [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 transition duration-200 ease-in-out w-full text-sm border-slate-200 shadow-sm rounded-md py-2 px-3 pr-8 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 group-[.form-inline]:flex-1';
  styleLabel = 'inline-block mb-2 group-[.form-inline]:mb-2 group-[.form-inline]:sm:mb-0 group-[.form-inline]:sm:mr-5 group-[.form-inline]:sm:text-right';
  styleIconButtonText = 'stroke-1.5 w-5 h-5 mr-2 h-4 w-4 mr-2 h-4 w-4';
  styleIconButtonSmall = 'stroke-1.5 w-5 h-5';
  styleButtonTab = 'cursor-pointer block appearance-none px-5 py-2.5 border border-transparent text-slate-700 dark:text-slate-400 [&.active]:text-slate-800 [&.active]:dark:text-white shadow-[0px_3px_20px_#0000000b] rounded-md [&.active]:bg-primary [&.active]:text-white [&.active]:font-medium w-full py-2';
  styleTdTableSimple = 'px-5 py-3 border-b dark:border-darkmode-300 whitespace-nowrap';
  styleThTableSimple = 'font-medium px-5 py-3 border-b-2 dark:border-darkmode-300 whitespace-nowrap';
  styleTrTableSimple = '[&:nth-of-type(odd)_td]:bg-slate-100 [&:nth-of-type(odd)_td]:dark:bg-darkmode-300 [&:nth-of-type(odd)_td]:dark:bg-opacity-50';
  styleInputFile = 'relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-[0.32rem] text-base font-normal leading-[2.15] text-surface transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:me-3 file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-e file:border-solid file:border-inherit file:bg-transparent file:px-3  file:py-[0.32rem] file:text-surface focus:border-primary focus:text-gray-700 focus:shadow-inset focus:outline-none dark:border-white/70 dark:text-white  file:dark:text-white';
  styleSwitch = "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50 w-[38px] h-[24px] p-px rounded-full relative before:w-[20px] before:h-[20px] before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-[margin-left] before:duration-200 before:ease-in-out before:absolute before:inset-y-0 before:my-auto before:rounded-full before:dark:bg-darkmode-600 checked:bg-primary checked:border-primary checked:bg-none before:checked:ml-[14px] before:checked:bg-white w-[38px] h-[24px] p-px rounded-full relative before:w-[20px] before:h-[20px] before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-[margin-left] before:duration-200 before:ease-in-out before:absolute before:inset-y-0 before:my-auto before:rounded-full before:dark:bg-darkmode-600 checked:bg-primary checked:border-primary checked:bg-none before:checked:ml-[14px] before:checked:bg-white";
  styleBtnHour = "transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs py-1.5 px-2 bg-secondary/70 border-secondary/70 text-slate-500 dark:border-darkmode-400 dark:bg-darkmode-400 dark:text-slate-300 [&:hover:not(:disabled)]:bg-slate-100 [&:hover:not(:disabled)]:border-slate-100 [&:hover:not(:disabled)]:dark:border-darkmode-300/80 [&:hover:not(:disabled)]:dark:bg-darkmode-300/80 mb-2 mr-1 w-24 mb-2 mr-1 w-24";
  styleCheckBox = "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer rounded focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50";
  styleRadioButton = "transition-all duration-100 ease-in-out shadow-sm border-slate-200 cursor-pointer focus:ring-4 focus:ring-offset-0 focus:ring-primary focus:ring-opacity-20 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&[type='radio']]:checked:bg-primary [&[type='radio']]:checked:border-primary [&[type='radio']]:checked:border-opacity-10 [&[type='checkbox']]:checked:bg-primary [&[type='checkbox']]:checked:border-primary [&[type='checkbox']]:checked:border-opacity-10 [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:dark:bg-darkmode-800/50 [&:disabled:checked]:opacity-70 [&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:dark:bg-darkmode-800/50";
  styleButtonGrayGroup = "py-2 px-3 bg-slate-100 border shadow-sm border-slate-200 text-slate-600 dark:bg-darkmode-900/20 dark:border-darkmode-900/20 dark:text-slate-400 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r ";
  styleButtonPrimaryGroup = "py-2 px-3 border shadow-sm  text-slate-600  dark:text-slate-400 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r bg-primary border-primary text-white dark:border-primary";
  styleButtonPendingGroup = "py-2 px-3 border shadow-sm  text-slate-600  dark:text-slate-400 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r bg-pending border-pending text-white dark:border-pending";
  styleButtonWarningGroup = "py-2 px-3 border shadow-sm  text-slate-600  dark:text-slate-400 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r bg-warning border-warning text-white dark:border-warning";

  styleListSmallButtonRoundedPrimary = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-primary border-primary text-white dark:border-primary mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonRoundedPending = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-pending border-pending text-white dark:border-pending mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonRoundedDark = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-dark border-dark text-white dark:border-dark mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonRoundedWarning = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-warning border-warning  dark:border-warning mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonRoundedSuccess = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-success border-success  dark:border-success mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonRoundedSecondary = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-secondary/70 border-secondary/70  dark:border-secondary/70 mb-2 mr-1 tooltip cursor-pointer';
  styleListSmallButtonRoundedDanger = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-1.5 px-2 rounded-full font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed text-xs bg-danger border-danger text-white dark:border-danger mb-2 mr-1 tooltip cursor-pointer';
  styleSearchChat = 'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm shadow-sm rounded-md placeholder:text-slate-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 border-transparent bg-slate-100 px-4 py-3 pr-10"';
  styleTextareaChat = 'disabled:bg-slate-100 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent [&[readonly]]:bg-slate-100 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent transition duration-200 ease-in-out w-full text-sm rounded-md placeholder:text-slate-400/90 focus:ring-primary focus:ring-opacity-20 focus:border-opacity-40 dark:border-transparent dark:focus:ring-slate-700 dark:focus:ring-opacity-50 dark:placeholder:text-slate-500/80 group-[.form-inline]:flex-1 group-[.input-group]:rounded-none group-[.input-group]:[&:not(:first-child)]:border-l-transparent group-[.input-group]:first:rounded-l group-[.input-group]:last:rounded-r group-[.input-group]:z-10 h-[46px] resize-none px-5 py-3 focus:border-transparent focus:ring-0 dark:bg-darkmode-600 shadow-md border-slate-200';
  styleUbicacionChat = 'transition duration-200 border shadow-sm inline-flex items-center justify-center py-2 px-3 rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed border-primary text-primary dark:border-primary [&:hover:not(:disabled)]:bg-primary/10 mb-2 mr-1 inline-block w-64 mb-2 mr-1 inline-block w-64';

  styleTdTableSimpleAncho = 'px-4 py-0 border-b dark:border-darkmode-300 whitespace-nowrap leading-none text-xs';
  
  constructor() { }


  StyleDivMainModal(): String {
    return this.styleDivMainModal;
  }
  StyleDivHeaderModal(): String {
    return this.styleDivHeaderModal;
  }
  StyleAX(): String {
    return this.styleAX;
  }
  StyleIconX(): String {
    return this.styleIconX;
  }
  StyleDataTable(): String {
    return this.styleDataTable;
  }
  StyleThDataTable(): String {
    return this.styleThDataTable;
  }
  StyleTdDataTable(): String {
    return this.styleTdDataTable;
  }
  StyleTdDataTableSmall(): String {
    return this.styleTdDataTableSmall;
  }
  StyleTdButtonsDataTable(): String {
    return this.styleTdButtonsDataTable;
  }
  StyleListSmallButtonPrimary(): String {
    return this.styleListSmallButtonPrimary;
  }
  StyleListSmallButtonPending(): String {
    return this.styleListSmallButtonPending;
  }
  StyleListSmallButtonDark(): String {
    return this.styleListSmallButtonDark;
  }
  StyleListSmallButtonWarning(): String {
    return this.styleListSmallButtonWarning;
  }
  StyleListSmallButtonSuccess(): String {
    return this.styleListSmallButtonSuccess;
  }
  StyleListSmallButtonSecondary(): String {
    return this.styleListSmallButtonSecondary;
  }
  StyleListSmallButtonDanger(): String {
    return this.styleListSmallButtonDanger;
  }
  StyleButtonSearch(): String {
    return this.styleButtonSearch;
  }
  StyleButtonPrimary(): String {
    return this.styleButtonPrimary;
  }
  StyleButtonPrimaryLarge(): String {
    return this.styleButtonPrimaryLarge;
  }
  StyleButtonPrimaryXLarge(): String {
    return this.styleButtonPrimaryXLarge;
  }
  StyleButtonPending(): String {
    return this.styleButtonPending;
  }
  StyleButtonPendingLarge(): String {
    return this.styleButtonPendingLarge;
  }
  StyleButtonSuccess(): String {
    return this.styleButtonSuccess;
  }
  StyleButtonWarning(): String {
    return this.styleButtonWarning;
  }
  StyleButtonDanger(): String {
    return this.styleButtonDanger;
  }
  StyleInputText(): String {
    return this.styleInputText;
  }
  StyleInputTextBorderRed(): String {
    return this.styleInputTextBorderRed;
  }
  StyleLabel(): String {
    return this.styleLabel;
  }
  StyleIconButtonText(): String {
    return this.styleIconButtonText;
  }
  StyleIconButtonSmall(): String {
    return this.styleIconButtonSmall;
  }
  StyleSelect(): String {
    return this.styleSelect;
  }
  StyleButtonTab(): String {
    return this.styleButtonTab;
  }
  StyleTdTableSimple(): String {
    return this.styleTdTableSimple;
  }
  StyleThTableSimple(): String {
    return this.styleThTableSimple;
  }
  StyleTrTableSimple(): String {
    return this.styleTrTableSimple;
  }
  StyleInputFile(): String {
    return this.styleInputFile;
  }
  StyleSwitch(): String {
    return this.styleSwitch;
  }
  StyleBtnHour(): String {
    return this.styleBtnHour;
  }
  StyleCheckBox(): String {
    return this.styleCheckBox;
  }
  StyleRadioButton(): String {
    return this.styleRadioButton;
  }
  StyleButtonGrayGroup(): string {
    return this.styleButtonGrayGroup;
  }
  StyleButtonPrimaryGroup(): string {
    return this.styleButtonPrimaryGroup;
  }
  StyleButtonPendingGroup(): string {
    return this.styleButtonPendingGroup;
  }
  StyleButtonWarningGroup(): string {
    return this.styleButtonWarningGroup;
  }


  StyleListSmallButtonRoundedPending(): String {
    return this.styleListSmallButtonRoundedPending;
  }

  StyleListSmallButtonRoundedDark(): String {
    return this.styleListSmallButtonRoundedDark;
  }

  StyleListSmallButtonRoundedWarning(): String {
    return this.styleListSmallButtonRoundedWarning;
  }

  StyleListSmallButtonRoundedSuccess(): String {
    return this.styleListSmallButtonRoundedSuccess;
  }

  StyleListSmallButtonRoundedSecondary(): String {
    return this.styleListSmallButtonRoundedSecondary;
  }

  StyleListSmallButtonRoundedDanger(): String {
    return this.styleListSmallButtonRoundedDanger;
  }
  StyleSearchChat(): String {
    return this.styleSearchChat;
  }
  StyleTextareaChat(): String {
    return this.styleTextareaChat;
  }
  StyleUbicacionChat(): String {
    return this.styleUbicacionChat;
  }
  StyleListSmallButtonRoundedPrimary(): String {
    return this.styleListSmallButtonRoundedPrimary;
  }  
  StyleTdTableSimpleAncho(): String {
    return this.styleTdTableSimpleAncho;
  }
}
