import React from 'react';

export type PageSectionHeaderProps = {
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  className?: string;
  eyebrowClassName?: string;
  ruleClassName?: string;
  titleClassName?: string;
  introClassName?: string;
  as?: 'header' | 'div';
  titleTag?: 'h1' | 'h2';
  uppercase?: boolean;
};

export function PageSectionHeader({
  eyebrow,
  title,
  intro,
  className = '',
  eyebrowClassName = '',
  ruleClassName = '',
  titleClassName = '',
  introClassName = '',
  as: Wrapper = 'header',
  titleTag: TitleTag = 'h1',
  uppercase = true,
}: PageSectionHeaderProps) {
  return (
    <Wrapper className={`page-header ${className}`.trim()}>
      <p className={`type-eyebrow ${eyebrowClassName}`.trim()}>{eyebrow}</p>
      <div className={`page-header__rule ${ruleClassName}`.trim()} aria-hidden />
      <TitleTag
        className={`type-h1 mt-4 ${uppercase ? 'uppercase' : ''} ${titleClassName}`.trim()}
      >
        {title}
      </TitleTag>
      {intro ? (
        <div className={`page-header__intro ${introClassName}`.trim()}>{intro}</div>
      ) : null}
    </Wrapper>
  );
}
