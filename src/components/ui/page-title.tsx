
interface Props {
    title: string;
    description?: string;
};

export const PageTitle = ({ title, description }: Props) => {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-semibold">{title}</h1>
                {description && (
                    <p className="text-muted-foreground">
                        {description}
                    </p>
                )}
            </div>
        </div>
    )
}
