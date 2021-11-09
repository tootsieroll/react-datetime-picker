import React from 'react';

interface PickerGroupProps {
    type: string;
    items: string[];
    selected: string;
    onChange: (v: Array<string | number>) => void;
}
const PickerGroup: React.FC<PickerGroupProps> = ({ type, items, selected, onChange }) => {
    const groupRef = React.createRef<HTMLDivElement>();
    const [isDragging, setDragging] = React.useState<any>(null);
    const [isMouseMove, setMouseMove] = React.useState<boolean>(false);
    const setCurrentPosition = () => {
        if (groupRef.current) {
            const selected = groupRef.current.querySelector('.dt-picker-item--selected');
            if (selected) selected.scrollIntoView({ block: 'center' });
        }
    };
    const isInViewport = (el: HTMLDivElement) => {
        if (!groupRef.current) return false;
        const rect = el.getBoundingClientRect();
        const view = groupRef.current.getBoundingClientRect();
        return rect.top >= view.y + view.height / 2 - 30 && rect.bottom <= view.y + view.height / 2 + 30;
    };
    const handleDragStart = (e: any) =>
        setDragging({
            top: groupRef.current?.scrollTop || 0,
            y: e.clientY,
        });
    const handleDragStop = () => {
        if (groupRef.current) {
            let result: Array<string | number> | null = null;
            const arr: Array<HTMLDivElement> = Array.prototype.slice.call(
                groupRef.current.querySelectorAll('.dt-picker-item')
            );
            for (let i = 0; i < arr.length; i++) {
                if (isInViewport(arr[i]) && !arr[i].classList.contains('dt-picker-item--selected')) {
                    groupRef.current
                        .querySelector('.dt-picker-item--selected')
                        ?.classList.remove('dt-picker-item--selected');
                    arr[i].classList.add('dt-picker-item--selected');
                    result = [type, arr[i].textContent || '', i];
                    break;
                }
            }
            setTimeout(() => setCurrentPosition(), 30);
            if (result) onChange(result);
            if (isMouseMove) setTimeout(() => setMouseMove(false), 0);
        }
        setDragging(null);
    };
    const handleDrag = (e: any) => {
        if (isDragging && groupRef.current) {
            groupRef.current.scrollTop = isDragging.top - (e.clientY - isDragging.y);
            if (!isMouseMove) setMouseMove(true);
        }
    };
    const handleClick = (e: any) => {
        if (!isMouseMove && groupRef.current) {
            const el = e.target;
            groupRef.current.querySelector('.dt-picker-item--selected')?.classList.remove('dt-picker-item--selected');
            el.classList.add('dt-picker-item--selected');
            setCurrentPosition();
            onChange([type, el.textContent, [...el.parentNode.children].indexOf(el)]);
        }
    };
    let timeout: ReturnType<typeof setTimeout> | null = null;
    const handleWheel = (e: any) => {
        if (timeout) clearTimeout(timeout);
        if (!isMouseMove && groupRef.current) {
            e.stopPropagation();
            groupRef.current.scrollTop += e.deltaY;
            timeout = setTimeout(() => handleDragStop(), 200);
        }
    };
    React.useEffect(() => {
        setCurrentPosition();
        document.addEventListener('mousemove', handleDrag);
        document.addEventListener('mouseup', handleDragStop);
        return () => {
            document.removeEventListener('mousemove', handleDrag);
            document.removeEventListener('mouseup', handleDragStop);
        };
    }, [groupRef.current, handleDragStop]);
    return (
        <div className={'dt-picker-group dt-picker-' + type} ref={groupRef}>
            <div
                className={'dt-picker-scrollable' + isDragging ? ' dt-picker-onmousemove' : ''}
                onMouseDown={handleDragStart}
                onWheel={handleWheel}
                onClick={handleClick}
            >
                {items.map((item: string, index: number) => (
                    <div
                        key={`item_${index}`}
                        className={
                            `dt-picker-item dt-picker-${type}__item` +
                            (item === selected ? ' dt-picker-item--selected' : '')
                        }
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default PickerGroup;
