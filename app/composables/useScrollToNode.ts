
export const useScrollToNode = (activeId: Ref<string | null>) => {

    const onItemClick = (node: any) => {
        const element = document.getElementById(node.id);

        if (element) {
            navigateTo(`#${node.id}`, { replace: true });
            element.scrollIntoView({ behavior: "smooth", block: "start" });
            activeId.value = node.id;
        }
    };

    return {
        activeId,
        onItemClick,
    };


}

