import { Component, createSignal, onCleanup } from "solid-js";
import styles from "./styles.module.css";


function clickOutside(el: any, accessor: any) {
  const onClick = (e: any) => !el.contains(e.target) && accessor()?.();
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
}

interface ButtonsProps {
  showDelete: boolean;
  onClickAdd: (numberInputs: number, numberOutputs: number) => void;
  onClickDelete: () => void;
}

const ButtonsComponent: Component<ButtonsProps> = (props: ButtonsProps) => {
  // Signals
  const [isOpen, setIsOpen] = createSignal<boolean>(false);
  const [numberInputs, setNumberInputs] = createSignal<number>(0);
  const [numberOutputs, setNumberOutputs] = createSignal<number>(0);
  
  const handleOnClickAdd = (event:any) => {
    event.stopPropagation();
    setIsOpen(true);
  }

  const handleOnClickAddNode = (event:any) => {
    event.stopPropagation();
    
    // Validate number of inputs and outputs
    if (numberInputs() > 4 || numberInputs() < 0 || numberOutputs() > 4 || numberOutputs() < 0) return;

    setIsOpen(false);
    props.onClickAdd(numberInputs(), numberOutputs());
    setNumberInputs(0);
    setNumberOutputs(0);
  }  
  
  const handleChangeNumberInputs = (event:any) => {
    setNumberInputs(event.target.value);
  }
  const handleChangeNumberOutputs = (event:any) => {
    setNumberOutputs(event.target.value);
  }

  const handleClickOutsideDropwdown = () => {
    setIsOpen(false);
    setNumberInputs(0);
    setNumberOutputs(0);
  }


  return (
    <div class={styles.wrapper}>
      <button class={props.showDelete ? styles.buttonDelete : styles.buttonDeleteHidden} onClick={props.onClickDelete} >
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          style="overflow: visible;">
          <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
        </svg>
      </button>
      <button class={styles.buttonAdd} onClick={handleOnClickAdd}>
        <svg
          fill="currentColor"
          stroke-width="0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          height="1em"
          width="1em"
          style="overflow: visible;">
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path>
        </svg>
      </button>
      <div
        class={isOpen() ? styles.dropdown : styles.dropdownHidden}
        //@ts-ignore
        use:clickOutside={handleClickOutsideDropwdown}
      >
        <label class={styles.label}>Number of inputs</label>
        <input class={styles.input} type="number" value={numberInputs()} onInput={handleChangeNumberInputs}></input>
        <label class={styles.label}>Number of outputs</label>
        <input class={styles.input} type="number" value={numberOutputs()} onInput={handleChangeNumberOutputs}></input>
        <button class={styles.buttonRect} onClick={handleOnClickAddNode}>
          Add node
        </button>
      </div>

    </div>
  )
}

export default ButtonsComponent;