import { getActiveSections, toggleSectionStatus } from '@/lib/action';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';

interface Section {
  _id: string;
  sectionName: string;
  isActive: boolean;
}

const ToggleSection: React.FC<{ sections?: Section[] }> = ({ sections = [] }) => {

  const [sectionList, setSectionList] = useState<Section[]>(sections);


  const handleToggleStatus = async (sectionId: string) => {
    const result = await toggleSectionStatus(sectionId);

    if (result.success) {
      setSectionList(prevSections =>
        prevSections.map(section =>
          section._id === sectionId ? { ...section, isActive: result.isActive } : section
        )
      );
    } else {
      console.error('Failed to update section status:', result.message);
    }
  };

  return (
    <div>
      <ul>
        {sectionList?.map((section) => (
          <li key={section._id}>
            {section.sectionName} - Status: {section.isActive ? 'Active' : 'Inactive'}
            <button onClick={() => handleToggleStatus(section._id)}>
              {section.isActive ? 'Deactivate' : 'Activate'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToggleSection;

export const getServerSideProps: GetServerSideProps = async () => {
    const { allSections } = await getActiveSections();
    const sections = allSections.map((section: any) => ({
        _id: section._id,
        sectionName: section.sectionName,
        isActive: section.isActive,
      }));
    return {
      props: {
        sections,
      },
    };
  };