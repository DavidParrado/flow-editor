
import { Accessor, Component, For } from "solid-js";
import styles from "./styles.module.css"

interface NodeProps {
  id: string;
  x: number;
  y: number;
  numberInputs: number;
  numberOutputs: number;
  selected: boolean;
  onMouseDownNode: (id: string, event: any) => void;
  onMouseDownOutput: (outputPositionX: number, outputPositionY: number, nodeId: string, outputIndex: number) => void;
  onMouseEnterInput: (inputPositionX: number, inputPositionY: number, nodeId: string, inputIndex: number) => void;
  onMouseLeaveInput: (nodeId: string, inputIndex: number) => void;

}

export const NodeComponent: Component<NodeProps> = (props: NodeProps) => {

  const handleMouseDownOutput = (ref: any, event: any, inputIndex: number) => {
    // Disable drag node
    event.stopPropagation();

    const centerX = ref.getBoundingClientRect().left + Math.abs(ref.getBoundingClientRect().right - ref.getBoundingClientRect.left) / 2;
    const centerY = ref.getBoundingClientRect().top + Math.abs(ref.getBoundingClientRect().bottom - ref.getBoundingClientRect.top) / 2;
    props.onMouseDownOutput(centerX, centerY, props.id, inputIndex)
  }

  const handleMouseEnterInput = (ref: any, inputIndex: number) => {
    const centerX = ref.getBoundingClientRect().left + Math.abs(ref.getBoundingClientRect().right - ref.getBoundingClientRect.left) / 2;
    const centerY = ref.getBoundingClientRect().top + Math.abs(ref.getBoundingClientRect().bottom - ref.getBoundingClientRect.top) / 2;
    props.onMouseEnterInput(centerX, centerY, props.id, inputIndex)
  }

  const handleMouseLeaveInput = (inputIndex: number) => {
    props.onMouseLeaveInput(props.id, inputIndex);
  }

  const handleMouseLeaveOutput = (inputIndex: number) => {
    props.onMouseLeaveInput(props.id, inputIndex);
  }

  return (
    // Este es el nodo
    <div
      class={props.selected ? styles.nodeSelected : styles.node}
      style={{
        transform: `translate(${props.x}px, ${props.y}px)`
      }}
      onMouseDown={(event: any) => {
        // Prevent click on board
        event.stopPropagation();
        props.onMouseDownNode(props.id, event);
      }}
    >
      {/* Estos son los inputs, que son los botones que rodean a los nodos */}
      <div class={styles.inputsWrapper}>
        <For each={[...Array(Number(props.numberInputs)).keys()]}>
          {(_, index: Accessor<number>) => {
            let inputRef: any = null;
            return (
              <div
                ref={inputRef}
                class={styles.input}
                onMouseEnter={() => handleMouseEnterInput(inputRef, index())}
                onMouseLeave={() => handleMouseLeaveInput(index())}
              >

              </div>
            )
          }}
        </For>
      </div>

      {/* Estos son los outputs, que son los botones que rodean a los nodos */}
      <div class={styles.outputsWrapper}>
        <For each={[...Array(Number(props.numberOutputs)).keys()]}>
          {(_, index: Accessor<number>) => {
            let outputRef: any = null;
            return (
              <div
                ref={outputRef}
                class={styles.output}
                onMouseEnter={(event: any) => handleMouseDownOutput(outputRef, event, index())}
                onMouseLeave={() => handleMouseLeaveOutput(index())}
              >

              </div>
            )
          }}
        </For>
      </div>
    </div>
  )
}
